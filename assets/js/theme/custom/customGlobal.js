import utils from '@bigcommerce/stencil-utils';
import { defaultModal } from '../global/modal';
import { load } from 'webfontloader';
import event from '../global/jquery-migrate/event';
import { forEach } from 'lodash';

export default function(context) {
    const $context = context,
    theme_settings = context.themeSettings;
    
    var scroll_position = $(window).scrollTop();

    var checkJS_load = true;

    function loadFunction() {
        if(checkJS_load) {
            checkJS_load = false;

            /* Add Funcion Here */
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
            searchMobileClick();
            searchFormMobile();
            sidebarMobile();
            clickHaloBackground();
        })

        /* Scroll Event */
        $(window).on("scroll", (e) => {
            const $target = $(e.currentTarget);
            const tScroll = $target.scrollTop();

            loadFunction();
            scrollAnimation(tScroll);
        })

        /* Mouse Over Touch Start */
        $(document).on('keydown mousemove touchstart', (e) => {
            loadFunction();
        });

        /* Resize */
        $(window).on('resize', (e) => {
            searchFormMobile();
        });
    }
    eventLoad();

    /* Slick Function */
    function slickCarousel(wrap) {
        const showDesktop = wrap.data('slick-show-desktop'),
            showTablet = wrap.data('slick-show-tablet'),
            showMobile = wrap.data('slick-show-mobile'),
            showDotbars = wrap.data('dots-bar');

        wrap.slick({
            dots: showDotbars,
            arrows: true,
            infinite: false,
            mobileFirst: true,
            slidesToShow: showMobile,
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
} 