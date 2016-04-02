var router;
(function (router) {
    function init(main) {
        router.app = main;
    }
    router.init = init;
    function changePage(page) {
        router.app.removeChildren();
        router.app.addChild(page);
    }
    router.changePage = changePage;
})(router || (router = {}));
//# sourceMappingURL=Router.js.map