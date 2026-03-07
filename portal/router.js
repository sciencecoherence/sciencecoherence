// portal/router.js
(function () {
    var w = window.innerWidth || screen.width;
    var hasTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    var ua = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
    var isMobile = (w < 768) || (hasTouch && w < 1024) || ua;

    // Manual override — user can call localStorage.setItem('sci-coh-layout', 'desktop') to stay on desktop
    var override = localStorage.getItem('sci-coh-layout');
    if (override === 'desktop') isMobile = false;
    if (override === 'mobile') isMobile = true;

    var path = window.location.pathname;
    var inMobile = path.includes('/mobile/');

    if (isMobile && !inMobile) {
        // /portal/main-project/cosmos.html → /portal/main-project/mobile/cosmos.html
        var parts = path.split('/');
        var file = parts.pop();
        window.location.replace(parts.join('/') + '/mobile/' + file);
    } else if (!isMobile && inMobile) {
        // Reverse: strip /mobile/ out of path
        window.location.replace(path.replace('/mobile/', '/'));
    }
})();