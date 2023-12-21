import utils from '@bigcommerce/stencil-utils';
import { defaultModal } from '../global/modal';
import { load } from 'webfontloader';
import event from '../global/jquery-migrate/event';
import { forEach } from 'lodash';
import haloMegaMenuEditor from './haloMegaMenuEditor';

export default function(context) {
    const $context = context,
    theme_settings = context.themeSettings;
    
    var scroll_position = $(window).scrollTop();

    var checkJS_load = true;

    function loadFunction() {
        if(checkJS_load) {
            checkJS_load = false;
            if (context.themeSettings.themevale_megamenu) haloMegaMenuEditor(context);
            back_to_top();
            
        }
    }

    function eventLoad() {
        /* Load Event */
        $(document).ready(function(){
            const wWidth = window.innerWidth,
                tScroll = $(this).scrollTop();

            var slickWrapperList = $('.section-slick');

            /* Loop All Slick Slider */
            forEach(slickWrapperList, (slickWrapperItem) => {
                slickCarousel($(slickWrapperItem));
            })

            /* Animate Scroll */
            scrollAnimation(tScroll);
            clickHaloBackground();
            menuMobile();
            searchMobileClick();
            searchFormMobile();
            sidebarMobile();
            footer_mobile();
            toggle_footer();
            productCardQtyChange();
        })

        /* Scroll Event */
        $(window).on("scroll", debounce((e) => {
            const $target = $(e.currentTarget);
            const tScroll = $target.scrollTop();

            loadFunction();
            scrollAnimation(tScroll);
        }, 200))

        /* Mouse Over Touch Start */
        $(document).on('keydown mousemove touchstart', (e) => {
            loadFunction();
        });

        /* Resize */
        $(window).on('resize', debounce((e) => {
            searchFormMobile();
            changeMenuItems();
            menuMobile();
            footer_mobile();
        }));
    }
    eventLoad();

    /* Debounce Function */
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = $context,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait || 500);
            if (callNow) func.apply(context, args);
        };
    }

    /* Slick Function */
    function slickCarousel(wrap) {
        const showDesktop = wrap.data('slick-show-desktop') ? wrap.data('slick-show-desktop') : 5,
            showTablet = wrap.data('slick-show-tablet') ? wrap.data('slick-show-tablet') : 3,
            showMobile = wrap.data('slick-show-mobile') ? wrap.data('slick-show-mobile') : 2,
            showDotbars = wrap.data('dots-bar');

        wrap.slick({
            dots: showDotbars,
            arrows: true,
            infinite: false,
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: showDesktop
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: showTablet
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: showMobile
                    }
                }
            ]
        });
    }

    /* Scroll Animate */
    function scrollAnimation(tScroll) {
        const $element = $('.custom-animation');

        if ($element.length) {
            $element.each(function(i) {
                const $elementTop = $element.eq(i).offset().top - screen.height + 50;
                const $elementBottom = $element.eq(i).offset().top + screen.height - 50;
                var img = $element.eq(i).find('img');

                if (tScroll < $elementBottom && tScroll > $elementTop) {
                    $element.eq(i).addClass('animated');
                }
            });
        }
    }

    function clickHaloBackground(){
        $('.halo-background').on('click', event => {
            event.preventDefault();

            if ($('body').hasClass('has-activeNavPages')) {
                $('.mobileMenu-toggle').trigger('click');
            }

            $('[data-search="quickSearch"]').removeClass('is-open');
            $('body').removeClass('openSidebar openSearchMobile openBeforeYouLeave');
            $('.page-sidebar-mobile').removeClass('is-open');
            $('.page-sidebar').removeClass('is-open');
        });
    }

    function menuMobile(){
        $('.halo-menu-mobile .halo-sidebar-close').on('click', event => {
            event.preventDefault();

            if ($('body').hasClass('has-activeNavPages')) {
                $('.mobileMenu-toggle').trigger('click');
            }
        });

        if ($(window).width() <= 1024) {
            $('.mobileMenu-toggle').on('click', event => {
                if($('.halo-bottomHeader .navPages-list:not(.navPages-list--user)').length){
                    $('.halo-bottomHeader .navPages-list:not(.navPages-list--user)').children().prependTo('#halo-menu-mobile .navPages-list:not(.navPages-list--user)');
                }
            });
        }
    }

    function sidebarMobile(){
        $('.page-sidebar-mobile').on('click', event => {
            if($(event.currentTarget).hasClass('is-open')){
                $(event.currentTarget).removeClass('is-open');
                $('.page-sidebar').removeClass('is-open');
                $('body').removeClass('openSidebar');
            } else{
                $(event.currentTarget).addClass('is-open');
                $('.page-sidebar').addClass('is-open');
                $('body').addClass('openSidebar');
            }
        });

        $('.page-sidebar .page-sidebar-close').on('click', event => {
            event.preventDefault();
            $('.page-sidebar-mobile').removeClass('is-open');
            $('.page-sidebar').removeClass('is-open');
            $('body').removeClass('openSidebar');
        });
    }

    function searchFormMobile() {
        if ($(window).width() <= 1024) {
            if ($('.item--quicksearch #quickSearch').length) {
                $('#quickSearch').appendTo('#halo-search-mobile .halo-sidebar-wrapper');
            }
        } else {
            if (!$('.item--quicksearch #quickSearch').length) {
                $('#halo-search-mobile #quickSearch').appendTo('.item--quicksearch');
            }
        }
    }

    function searchMobileClick(){
        const $search = $('[data-search="quickSearch"]');

        $search.on('click', event => {
            event.preventDefault();

            if(!$search.hasClass('is-open')){
                $search.addClass('is-open');
                $('body').addClass('openSearchMobile');
            } else{
                $search.removeClass('is-open');
                $('body').removeClass('openSearchMobile');
            }
        });

        $('#halo-search-mobile .halo-sidebar-close').on('click', event => {
            event.preventDefault();
            
            $search.removeClass('is-open');
            $('body').removeClass('openSearchMobile');
        });
    }

    /* Append Menu Items when responsive */
    function changeMenuItems() {
        if ($(window).width() > 1024) {
            $('#halo-menu-mobile').css({'top': $("header .halo-middleHeader").outerHeight() + 1, 'height': $(window).height() - $("header .halo-middleHeader").outerHeight()});
            if(!$('.header').hasClass('is-sticky')){
                if($('#halo-menu-mobile .navPages-list:not(.navPages-list--user)').length){
                    $('#halo-menu-mobile .navPages-list:not(.navPages-list--user)').children().prependTo('.halo-bottomHeader .navPages-list:not(.navPages-list--user)');
                }
            }
        } else {
            $('#halo-menu-mobile').css({'top': 0, 'height': '100%'});
        }
    }

    /* Footer Mobile */
    function footer_mobile() {
        if ($(window).width() <= 767) {
            if(!$('.themevale_footer-info').hasClass('footerMobile')) {
                $('.themevale_footer-info').addClass('footerMobile');
                $('.footer-dropdownmobile .footer-info-list').css('display', 'none');
            }
        } else {
            $('.themevale_footer-info').removeClass('footerMobile');
            $('.footer-dropdownmobile').removeClass('open-dropdown');
            $('.footer-dropdownmobile .footer-info-list').css('display', 'block');
        }
    }
    

    function toggle_footer() {
        $(document).on('click', '.footerMobile .footer-dropdownmobile .footer-info-heading', function() {
            $(this).parent().toggleClass('open-dropdown');
            $(this).parent().find('.footer-info-list').slideToggle();
        });
    }

    /* Back To Top */
    function back_to_top() {
        var offset = $(window).height()/2;
        const backToTop = $('#back-to-top');

        $(window).scroll(function() {
            ($(this).scrollTop() > offset) ? backToTop.addClass('is-visible') : backToTop.removeClass('is-visible');
        });

        backToTop.on('click', function(event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
        });
    }

    /* Product Card Quantity Change */
    function productCardQtyChange() {
        const cardActionList = document.querySelectorAll(".card .card-action-wrapper");
        
        if(!cardActionList) return;

        for(let cardActionItem of cardActionList) {
            let decButton = cardActionItem.querySelector('[data-action="dec"]'),
                incButton = cardActionItem.querySelector('[data-action="inc"]'),
                quantityInput = cardActionItem.querySelector('.card-form-incrementTotal');
            
            quantityInput.addEventListener('change', handleInputChange);
            incButton.addEventListener("click", handleButtonClick);
            decButton.addEventListener("click", handleButtonClick);

            // handle button clicks
            function handleButtonClick(event) {
                let currentValue = parseInt(quantityInput.value);
                let minValue = parseInt(quantityInput.dataset.quantityMin) ? parseInt(quantityInput.dataset.quantityMin) : 1;
                let maxValue = parseInt(quantityInput.dataset.quantityMax) ? parseInt(quantityInput.dataset.quantityMax) : 1000000;

                if (event.currentTarget.dataset.action === 'dec') {
                    quantityInput.value = Math.max(currentValue - 1, minValue);
                } else if (event.currentTarget.dataset.action === 'inc') {
                    quantityInput.value = Math.min(currentValue + 1, maxValue);
                }
            }

            // handle input change
            function handleInputChange(event) {
                let currentValue = parseInt(quantityInput.value);
                let minValue = parseInt(quantityInput.dataset.quantityMin) ? parseInt(quantityInput.dataset.quantityMin) : 1;
                let maxValue = parseInt(quantityInput.dataset.quantityMax) ? parseInt(quantityInput.dataset.quantityMax) : 1000000;

                if (isNaN(currentValue)) {
                    quantityInput.value = minValue;
                } else {
                    quantityInput.value = Math.min(Math.max(currentValue, minValue), maxValue);
                }
            }
        }
    }
} 