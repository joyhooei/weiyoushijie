var Router = (function () {
    function Router(main) {
        this._main = main;
    }
    var d = __define,c=Router,p=c.prototype;
    p.changePage = function (page) {
        this._main.removeChildren();
        this._main.addChild(page);
    };
    return Router;
})();
egret.registerClass(Router,'Router');
