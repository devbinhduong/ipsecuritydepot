import haloMegaMenu from './haloMegaMenu';
    window.haloMegaMenu = haloMegaMenu;

export default function (context) {
	if (context.themeSettings.haloMegamenuType == 'Editor') {
	    var haloMegaMenu = new window.haloMegaMenu();
	    const urlImgLoad = $('.halo-mega-menu').data('image-load');
	    const urlStoreHash = $('.halo-mega-menu').data('store-hash-image');

	    var mega_menu_style1_item = parseInt(context.themeSettings.mega_menu_style1_item),
            mega_menu_style2_item = parseInt(context.themeSettings.mega_menu_style2_item),
            mega_menu_style3_item = parseInt(context.themeSettings.mega_menu_style3_item),
            mega_menu_style4_item = parseInt(context.themeSettings.mega_menu_style4_item);

        var mega_menu_new_label = parseInt(context.themeSettings.mega_menu_new_label),
            mega_menu_sale_label = parseInt(context.themeSettings.mega_menu_sale_label),
            mega_menu_hot_label = parseInt(context.themeSettings.mega_menu_hot_label);

        function SetItemMegaMenu(){
            if($(window).width() > 1024) {
                $('.navPages-list-megamenu > li').mouseover(function() {

                    var numberItem = $(this).index() + 1;
                    
                    if (!$(this).hasClass('has-megamenu')) {
                        LoadMegaMenu(numberItem);
                    }
                });
            }

            $(document).on('click','#halo-menu-mobile .navPages-list:not(.navPages-list--user) > li > .navPages-action' , function() {
                var numberItem = $(this).parent().index() + 1;

                if (!$(this).parent().hasClass('has-megamenu')) {
                    LoadMegaMenu(numberItem);
                }
            });
        }
            
        function LoadMegaMenu(numberItem){
            if (mega_menu_style1_item == numberItem) {
                haloMegaMenu.menuItem(mega_menu_style1_item).setMegaMenu({
                    style: 'style 1',
                    imageAreaWidth: context.themeSettings.mega_menu_style1_item_img_width,
                    cateAreaWidth: context.themeSettings.mega_menu_style1_item_col_width,
                    productId: context.themeSettings.mega_menu_style1_item_productID,
                    cateColumns: context.themeSettings.mega_menu_style1_item_col,
                    products:'<h3 class="megamenu-title">'+context.themeSettings.mega_menu_style1_item_productBlock+'</h3>\
                            <div class="megamenu-slider"></div>',
                    content: '<ul class="navPage-subMenu-links navPage-subMenu-list">\
                                <li class="navPage-subMenu-item-child">\
                                    <p class="navPage-subMenu-action navPages-action navPages-action-depth-max has-subMenu">\
                                        <span class="text">'+context.themeSettings.mega_menu_style1_item_custom_title+'</span>\
                                        <span class="navPages-action-moreIcon" aria-hidden="true">\
                                            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-chevron-down"></use></svg>\
                                        </span>\
                                    </p>\
                                    <div class="navPage-subMenu navPage-subMenu-horizontal" aria-hidden="true" tabindex="-1">\
                                        <ul class="navPage-subMenu-list">\
                                            <li class="navPage-subMenu-item-child navPage-subMenu-title">\
                                                <p class="navPage-subMenu-action navPages-action">\
                                                    <span class="navPages-action-moreIcon" aria-hidden="true">\
                                                        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-chevron-down"></use></svg>\
                                                        <span>back</span>\
                                                    </span>\
                                                    <span class="text">'+context.themeSettings.mega_menu_style1_item_custom_title+'</span>\
                                                </p>\
                                            </li>\
                                            <li class="navPage-subMenu-item-child navPages-action-end">\
                                                <a class="navPage-subMenu-action navPages-action" href="'+context.themeSettings.mega_menu_style1_item_custom_link1+'"><span class="text">'+context.themeSettings.mega_menu_style1_item_custom_linktext1+'</span></a>\
                                            </li>\
                                            <li class="navPage-subMenu-item-child navPages-action-end">\
                                                <a class="navPage-subMenu-action navPages-action" href="'+context.themeSettings.mega_menu_style1_item_custom_link2+'"><span class="text">'+context.themeSettings.mega_menu_style1_item_custom_linktext2+'</span></a>\
                                            </li>\
                                            <li class="navPage-subMenu-item-child navPages-action-end">\
                                                <a class="navPage-subMenu-action navPages-action" href="'+context.themeSettings.mega_menu_style1_item_custom_link3+'"><span class="text">'+context.themeSettings.mega_menu_style1_item_custom_linktext3+'</span></a>\
                                            </li>\
                                            <li class="navPage-subMenu-item-child navPages-action-end">\
                                                <a class="navPage-subMenu-action navPages-action" href="'+context.themeSettings.mega_menu_style1_item_custom_link4+'"><span class="text">'+context.themeSettings.mega_menu_style1_item_custom_linktext4+'</span></a>\
                                            </li>\
                                            <li class="navPage-subMenu-item-child navPages-action-end">\
                                                <a class="navPage-subMenu-action navPages-action" href="'+context.themeSettings.mega_menu_style1_item_custom_link5+'"><span class="text">'+context.themeSettings.mega_menu_style1_item_custom_linktext5+'</span></a>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                </li>\
                            </ul>',
                    images: '<a class="image" href="'+context.themeSettings.mega_menu_style1_item_link+'">\
                                <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mega_menu_style1_item_img+'" alt="'+context.themeSettings.mega_menu_style1_item_img_alt+'" title="'+context.themeSettings.mega_menu_style1_item_img_alt+'"/>\
                            </a>'
                });
            } else if (mega_menu_style2_item == numberItem){
                haloMegaMenu.menuItem(mega_menu_style2_item).setMegaMenu({
                    style: 'style 2',
                    imageAreaWidth: context.themeSettings.mega_menu_style2_item_img_width,
                    cateAreaWidth: context.themeSettings.mega_menu_style2_item_col_width,
                    cateColumns: context.themeSettings.mega_menu_style2_item_col,
                    content: '<ul class="navPage-subMenu-links navPage-subMenu-list">\
                                <li class="navPage-subMenu-item-child">\
                                    <p class="navPage-subMenu-action navPages-action navPages-action-depth-max has-subMenu">\
                                        <span class="text">'+context.themeSettings.mega_menu_style2_item_custom_title+'</span>\
                                        <span class="navPages-action-moreIcon" aria-hidden="true">\
                                            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-chevron-down"></use></svg>\
                                        </span>\
                                    </p>\
                                    <div class="navPage-subMenu navPage-subMenu-horizontal" aria-hidden="true" tabindex="-1">\
                                        <ul class="navPage-subMenu-list">\
                                            <li class="navPage-subMenu-item-child navPage-subMenu-title">\
                                                <p class="navPage-subMenu-action navPages-action">\
                                                    <span class="navPages-action-moreIcon" aria-hidden="true">\
                                                        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-chevron-down"></use></svg>\
                                                        <span>back</span>\
                                                    </span>\
                                                    <span class="text">'+context.themeSettings.mega_menu_style2_item_custom_title+'</span>\
                                                </p>\
                                            </li>\
                                            <li class="navPage-subMenu-item-child navPages-action-end">\
                                                <a class="navPage-subMenu-action navPages-action" href="'+context.themeSettings.mega_menu_style2_item_custom_link1+'"><span class="text">'+context.themeSettings.mega_menu_style2_item_custom_linktext1+'</span></a>\
                                            </li>\
                                            <li class="navPage-subMenu-item-child navPages-action-end">\
                                                <a class="navPage-subMenu-action navPages-action" href="'+context.themeSettings.mega_menu_style2_item_custom_link2+'"><span class="text">'+context.themeSettings.mega_menu_style2_item_custom_linktext2+'</span></a>\
                                            </li>\
                                            <li class="navPage-subMenu-item-child navPages-action-end">\
                                                <a class="navPage-subMenu-action navPages-action" href="'+context.themeSettings.mega_menu_style2_item_custom_link3+'"><span class="text">'+context.themeSettings.mega_menu_style2_item_custom_linktext3+'</span></a>\
                                            </li>\
                                            <li class="navPage-subMenu-item-child navPages-action-end">\
                                                <a class="navPage-subMenu-action navPages-action" href="'+context.themeSettings.mega_menu_style2_item_custom_link4+'"><span class="text">'+context.themeSettings.mega_menu_style2_item_custom_linktext4+'</span></a>\
                                            </li>\
                                            <li class="navPage-subMenu-item-child navPages-action-end">\
                                                <a class="navPage-subMenu-action navPages-action" href="'+context.themeSettings.mega_menu_style2_item_custom_link5+'"><span class="text">'+context.themeSettings.mega_menu_style2_item_custom_linktext5+'</span></a>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                </li>\
                            </ul>',
                    products:'<h3 class="megamenu-title">'+context.themeSettings.mega_menu_style2_item_productBlock+'</h3>\
                            <div class="megamenu-brands">\
                                <a class="image" href="'+context.themeSettings.mega_menu_style2_item_brandlink1+'">\
                                    <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mega_menu_style2_item_brand1+'" alt="'+context.themeSettings.mega_menu_style2_item_brand1+'" title="'+context.themeSettings.mega_menu_style2_item_brand1+'">\
                                </a>\
                                <a class="image" href="'+context.themeSettings.mega_menu_style2_item_brandlink2+'">\
                                    <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mega_menu_style2_item_brand2+'" alt="'+context.themeSettings.mega_menu_style2_item_brand2+'" title="'+context.themeSettings.mega_menu_style2_item_brand2+'">\
                                </a>\
                                <a class="image" href="'+context.themeSettings.mega_menu_style2_item_brandlink3+'">\
                                    <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mega_menu_style2_item_brand3+'" alt="'+context.themeSettings.mega_menu_style2_item_brand3+'" title="'+context.themeSettings.mega_menu_style2_item_brand3+'">\
                                </a>\
                                <a class="image" href="'+context.themeSettings.mega_menu_style2_item_brandlink4+'">\
                                    <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mega_menu_style2_item_brand4+'" alt="'+context.themeSettings.mega_menu_style2_item_brand4+'" title="'+context.themeSettings.mega_menu_style2_item_brand4+'">\
                                </a>\
                            </div>',
                    images: '<div class="item"><a class="image" href="'+context.themeSettings.mega_menu_style2_item_link1+'">\
                                <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mega_menu_style2_item_img1+'" alt="'+context.themeSettings.mega_menu_style2_item_img1_alt+'" title="'+context.themeSettings.mega_menu_style2_item_img1_alt+'"/>\
                            </a></div>\
                            <div class="item"><a class="image" href="'+context.themeSettings.mega_menu_style2_item_link2+'">\
                                <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mega_menu_style2_item_img2+'" alt="'+context.themeSettings.mega_menu_style2_item_img2_alt+'" title="'+context.themeSettings.mega_menu_style2_item_img2_alt+'"/>\
                            </a></div>'
                });
            } else if (mega_menu_style3_item == numberItem){
                haloMegaMenu.menuItem(mega_menu_style3_item).setMegaMenu({
                    style: 'style 3',
                    cateColumns: context.themeSettings.mega_menu_style3_item_col,
                    imagesTop: ['<a class="image" href="'+context.themeSettings.mega_menu_style3_item_link1+'"><img class="lazyload" src="'+urlImgLoad+'"  data-src="'+urlStoreHash+context.themeSettings.mega_menu_style3_item_img1+'" alt="'+context.themeSettings.mega_menu_style3_item_img1_alt+'" title="'+context.themeSettings.mega_menu_style3_item_img1_alt+'"/></a>',
                                '<a class="image" href="'+context.themeSettings.mega_menu_style3_item_link2+'"><img class="lazyload" src="'+urlImgLoad+'"  data-src="'+urlStoreHash+context.themeSettings.mega_menu_style3_item_img2+'" alt="'+context.themeSettings.mega_menu_style3_item_img2_alt+'" title="'+context.themeSettings.mega_menu_style3_item_img2_alt+'"/></a>',
                                '<a class="image" href="'+context.themeSettings.mega_menu_style3_item_link3+'"><img class="lazyload" src="'+urlImgLoad+'"  data-src="'+urlStoreHash+context.themeSettings.mega_menu_style3_item_img3+'" alt="'+context.themeSettings.mega_menu_style3_item_img3_alt+'" title="'+context.themeSettings.mega_menu_style3_item_img3_alt+'"/></a>',
                                '<a class="image" href="'+context.themeSettings.mega_menu_style3_item_link4+'"><img class="lazyload" src="'+urlImgLoad+'"  data-src="'+urlStoreHash+context.themeSettings.mega_menu_style3_item_img4+'" alt="'+context.themeSettings.mega_menu_style3_item_img4_alt+'" title="'+context.themeSettings.mega_menu_style3_item_img4_alt+'"/></a>',
                                '<a class="image" href="'+context.themeSettings.mega_menu_style3_item_link5+'"><img class="lazyload" src="'+urlImgLoad+'"  data-src="'+urlStoreHash+context.themeSettings.mega_menu_style3_item_img5+'" alt="'+context.themeSettings.mega_menu_style3_item_img5_alt+'" title="'+context.themeSettings.mega_menu_style3_item_img5_alt+'"/></a>'
                    ],
                    bottomCates: '<div class="megamenu-custom-list"><div class="container"><span class="text">'+context.themeSettings.mega_menu_style3_item_bottomCates+'</span></div></div>',
                    countDown: context.themeSettings.mega_menu_style3_item_countDown
                });
            } else if (mega_menu_style4_item == numberItem){ 
                haloMegaMenu.menuItem(mega_menu_style4_item).setMegaMenu({
                    style: 'style 4',
                    cateColumns: context.themeSettings.mega_menu_style4_item_col,
                    productId: context.themeSettings.mega_menu_style4_item_productID,
                    products:'<h3 class="megamenu-title">'+context.themeSettings.mega_menu_style4_item_productBlock+'</h3>\
                            <div class="megamenu-slider2"></div>',
                    images: '<div class="item"><a class="image" href="'+context.themeSettings.mega_menu_style4_item_link1+'">\
                                <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mega_menu_style4_item_img1+'" alt="'+context.themeSettings.mega_menu_style4_item_img1_alt+'" title="'+context.themeSettings.mega_menu_style4_item_img1_alt+'"/>\
                            </a></div>\
                            <div class="item"><a class="image" href="'+context.themeSettings.mega_menu_style4_item_link2+'">\
                                <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mega_menu_style4_item_img2+'" alt="'+context.themeSettings.mega_menu_style4_item_img2_alt+'" title="'+context.themeSettings.mega_menu_style4_item_img2_alt+'"/>\
                            </a></div>',
                    imagesCustom: '<a class="image" href="'+context.themeSettings.mega_menu_style4_item_linkCustom+'">\
                            <img class="lazyload" src="'+urlImgLoad+'" data-src="'+urlStoreHash+context.themeSettings.mega_menu_style4_item_imgCustom+'" alt="'+context.themeSettings.mega_menu_style4_item_imgCustom_alt+'" title="'+context.themeSettings.mega_menu_style4_item_imgCustom_alt+'"/>\
                            </a>'
                });
            } else{
                return;
            }
        }

        function MegaMenuLabel(){
            if (mega_menu_new_label) {
                haloMegaMenu.menuItem(mega_menu_new_label).setMegaMenu({
                    label: 'new',
                    disabled: true,
                });
            }

            if (mega_menu_hot_label) {
                haloMegaMenu.menuItem(mega_menu_hot_label).setMegaMenu({
                    label: 'hot',
                    disabled: true,
                });
            }

            if (mega_menu_sale_label) {
                haloMegaMenu.menuItem(mega_menu_sale_label).setMegaMenu({
                    label: 'sale',
                    disabled: true,
                });
            }
        }

        MegaMenuLabel();

        var setItemMegaMenu = SetItemMegaMenu();

        window.onload = setItemMegaMenu;
	}
}
