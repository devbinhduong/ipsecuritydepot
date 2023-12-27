import utils from '@bigcommerce/stencil-utils';
import { defaultModal } from '../global/modal';
import { load } from 'webfontloader';
import event from '../global/jquery-migrate/event';
import { forEach } from 'lodash';
import haloMegaMenuEditor from './haloMegaMenuEditor';
import haloAskAnExpertPopup from './haloAskAnExpertPopup';


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
            setTimeout(()=> {
                handleDropdownMenu();
            }, 1000)

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
            authPopup();
            authSidebar();
            productTabsMobile();
            haloAskAnExpertPopup($context);
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
            handleDropdownMenu();
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

    function authPopup() {
        $('[data-login-form]').on('click', event => {
            event.preventDefault();
            if (!$('body').hasClass('page-type-login')) {
                const $target = $(event.currentTarget);
                $target.siblings('.halo-auth-popup').toggleClass('is-open');
            } else{
                $('html, body').animate({
                    scrollTop: $('.login').offset().top,
                }, 700);
            }
        });

        $(document).on('click', event => {
            if ($('.halo-auth-popup').hasClass('is-open')) {
                if (($(event.target).closest('.halo-auth-popup').length === 0) && ($(event.target).closest('[data-login-form]').length === 0)){
                    $('.halo-auth-popup').removeClass('is-open');
                }
            }
        });
    }


    function authSidebar() {
        $('[data-login-form-mobile]').on('click', event => {
            event.preventDefault();
            if (!$('body').hasClass('page-type-login')) {
                if($('.halo-auth-sidebar').hasClass('is-open')){
                    $('.halo-auth-sidebar').removeClass('is-open');
                    $('body').removeClass('openAuthSidebar');
                } else{
                    $('.halo-auth-sidebar').addClass('is-open');
                    $('body').addClass('openAuthSidebar');
                }
            } else{
                $('html, body').animate({
                    scrollTop: $('.login').offset().top,
                }, 700);
            }
        });

        $('.halo-auth-sidebar .halo-sidebar-close').on('click', event =>{
            event.preventDefault();

            $('.halo-auth-sidebar').removeClass('is-open');
            $('body').removeClass('openAuthSidebar');
        });

        $(document).on('click', event => {
            if ($('.halo-auth-sidebar').hasClass('is-open')) {
                if (($(event.target).closest('.halo-auth-sidebar').length === 0) && ($(event.target).closest('[data-login-form-mobile]').length === 0)){
                    $('.halo-auth-sidebar').removeClass('is-open');
                    $('body').removeClass('openAuthSidebar');
                }
            }
        });
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
                console.log("click")
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

    /* Handle when dropdown menu overflow the viewport */
    function handleDropdownMenu() {
        /* Handle For Level 3 Dropdown */
        const dropdownList = document.querySelectorAll(".navPages-item.has-dropdown:not(.hasMegamenu) .navPage-subMenu-item-child .navPage-subMenu-horizontal");
        for (let dropdown of dropdownList) {
            if(dropdown) {
                const dropdownOffset = dropdown.getBoundingClientRect();
                const isDropdownOverflow = dropdownOffset.right > window.innerWidth;
                if (isDropdownOverflow) {
                    dropdown.style.marginLeft = '-100%';
                }
            }
        }
    }

    function priceRangeDemo() {
        let min = 10;
        let max = 100;

        const calcLeftPosition = value => 100 / (100 - 10) *  (value - 10);

        $('#rangeMin').on('input', function(e) {
            const newValue = parseInt(e.target.value);
            if (newValue > max) return;
            min = newValue;
            $('#thumbMin').css('left', calcLeftPosition(newValue) + '%');
            $('#min').html(newValue);
            $('#line').css({
                'left': calcLeftPosition(newValue) + '%',
                'right': (100 - calcLeftPosition(max)) + '%'
            });
        });

        $('#rangeMax').on('input', function(e) {
            const newValue = parseInt(e.target.value);
            if (newValue < min) return;
            max = newValue;
            $('#thumbMax').css('left', calcLeftPosition(newValue) + '%');
            $('#max').html(newValue);
            $('#line').css({
                'left': calcLeftPosition(min) + '%',
                'right': (100 - calcLeftPosition(newValue)) + '%'
            });
        });
    }
    priceRangeDemo();

    // Product Tabs Mobile
    // -----------------------------------------------------------------------------
    function productTabsMobile() {
        const $btnTabMobile = $('.tab-titleMobile');

        $btnTabMobile.on('click', (e) => {
            e.preventDefault();
            const $target = $(e.currentTarget);
            const idTab = $target.attr('href');
            const thisTop = $('.productView-description').offset().top - 20;

            if ($target.hasClass('is-active')) {
                $target.removeClass('is-active');
                $(idTab).removeClass('is-active').find('.tabContent').slideUp();
            }
            else {
                const $tabActiveMobile = $('.productView-description .tabs-contents .tab-content.is-active');

                $btnTabMobile.removeClass('is-active');
                $target.addClass('is-active');
                $tabActiveMobile.removeClass('is-active').find('.tabContent').slideUp();
                $(idTab).addClass('is-active').find('.tabContent').slideDown();

                $('body,html').animate({
                    scrollTop: thisTop
                }, 1000);
            }
        });
    }
} 