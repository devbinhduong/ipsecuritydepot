import haloMegaMenu from './haloMegaMenu';
    window.haloMegaMenu = haloMegaMenu;

export default function (context) {
    $(document).ready(function() {
        var haloMegaMenu = new window.haloMegaMenu();
        if (!$('.themevale_allCategories-dropdown').length) {
            /* Megamenu Settings for Home 1 - 14*/
    
            haloMegaMenu.menuItem(1).themevaleMegaMenu({
                dropAlign: 'fullWidth',   // Dropdown MegaMenu Alignment: left, right, center, fullWidth
                dropWidth: '800px',       // Width of Dropdown MegaMenu (if dropAlign: fullWidth => dropWidth auto set 100%)
                dropType: 'noImage',    // Type of Dropdown MegaMenu content: imageLeft, imageRight, noImage
                imageAreaWidth: '5%',    // width of images area
                cateAreaWidth: '95%',     // width of categories area
                cateColumns: 5,           // columns of categories area - max 5 columns
                // contents for images column (HTML supported)
                images: '<div class="imgList"><div class="imgItem--full"><a href="#"><img src="/product_images/uploaded_images/header-img-9.jpg" alt=""/></a></div></div>' 
            });
    
            haloMegaMenu.menuItem(2).themevaleMegaMenu({
                dropAlign: 'fullWidth',   // Dropdown MegaMenu Alignment: left, right, center, fullWidth
                dropWidth: '800px',       // Width of Dropdown MegaMenu (if dropAlign: fullWidth => dropWidth auto set 100%)
                dropType: 'noImage',    // Type of Dropdown MegaMenu content: imageLeft, imageRight, noImage
                imageAreaWidth: '5%',    // width of images area
                cateAreaWidth: '95%',     // width of categories area
                cateColumns: 5,           // columns of categories area - max 5 columns
                // contents for images column (HTML supported)
                images: '<div class="imgList"><div class="imgItem--full"><a href="#"><img src="/product_images/uploaded_images/header-img-9.jpg" alt=""/></a></div></div>' 
            });
    
            haloMegaMenu.menuItem(3).themevaleMegaMenu({
                dropAlign: 'fullWidth',   // Dropdown MegaMenu Alignment: left, right, center, fullWidth
                dropWidth: '800px',       // Width of Dropdown MegaMenu (if dropAlign: fullWidth => dropWidth auto set 100%)
                dropType: 'noImage',    // Type of Dropdown MegaMenu content: imageLeft, imageRight, noImage
                imageAreaWidth: '5%',    // width of images area
                cateAreaWidth: '95%',     // width of categories area
                cateColumns: 5,           // columns of categories area - max 5 columns
                // contents for images column (HTML supported)
                images: '<div class="imgList"><div class="imgItem--full"><a href="#"><img src="/product_images/uploaded_images/header-img-9.jpg" alt=""/></a></div></div>' 
            });
    
    
            haloMegaMenu.menuItem(4).themevaleMegaMenu({
                dropAlign: 'fullWidth',   // Dropdown MegaMenu Alignment: left, right, center, fullWidth
                dropWidth: '800px',       // Width of Dropdown MegaMenu (if dropAlign: fullWidth => dropWidth auto set 100%)
                dropType: 'noImage',    // Type of Dropdown MegaMenu content: imageLeft, imageRight, noImage
                imageAreaWidth: '5%',    // width of images area
                cateAreaWidth: '95%',     // width of categories area
                cateColumns: 5,           // columns of categories area - max 5 columns
                // contents for images column (HTML supported)
                images: '<div class="imgList"><div class="imgItem--full"><a href="#"><img src="/product_images/uploaded_images/header-img-9.jpg" alt=""/></a></div></div>' 
            });
        }
    });
}
