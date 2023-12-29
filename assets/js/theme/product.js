/*
 Import all product specific js
 */
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/utils/form-utils';
import modalFactory from './global/modal';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
        this.reviewModal = modalFactory('#modal-review-form')[0];
    }

    onReady() {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);
        this.productDetails.setProductVariant();

        videoGallery();

        this.bulkPricingHandler();

        this.customProductTabs();

        this.calculateSalePercent();

        const $reviewForm = classifyForm('.writeReview-form');

        if ($reviewForm.length === 0) return;

        const review = new Review({ $reviewForm });

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
            this.ariaDescribeReviewInputs($reviewForm);
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        this.productReviewHandler();
    }

    ariaDescribeReviewInputs($form) {
        $form.find('[data-input]').each((_, input) => {
            const $input = $(input);
            const msgSpanId = `${$input.attr('name')}-msg`;

            $input.siblings('span').attr('id', msgSpanId);
            $input.attr('aria-describedby', msgSpanId);
        });
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.trigger('click');
        }
    }

    bulkPricingHandler() {
        if (this.url.indexOf('#bulk_pricing') !== -1) {
            this.$bulkPricingLink.trigger('click');
        }
    }

    /* Custom Tabs */
    customProductTabs() {
        $('.productView-description .custom-product-tab').appendTo('.productView-description #tab-custom .tabContent');
        $('#tab-custom .tabContent .icon-loading').hide();
        if($(".productView-description #tab-custom .tabContent").text().trim()==""){
            $(".productView-description .tab.tab-custom").hide();
        }
    }

    /* Caculate Sale Price Percent */
    calculateSalePercent() {
        let priceOrigin = document.querySelector(".productView-price .price--non-sale")?.innerText,
            priceSale = document.querySelector(".productView-price .price--withoutTax")?.innerText;

        if (!priceSale || !priceOrigin) return;

        let originValue = parseFloat(priceOrigin.replace('$', ''));
        let saleValue = parseFloat(priceSale.replace('$', ''));

        let percent = Math.floor((saleValue / originValue) * 100);

        let percentText = document.querySelector(".product-sale-price-percent");

        if(!Number.isNaN(percent)) {
            percentText.innerText = percent + "% OFF";
        }
    }
}
