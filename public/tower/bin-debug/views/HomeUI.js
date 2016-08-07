var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        _super.call(this, "homeUISkin");
    }
    var d = __define,c=HomeUI,p=c.prototype;
    p.onRefresh = function () {
        this.imgBattle1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.showUI(new BattleUI(1, 1));
        }, this);
    };
    return HomeUI;
}(AbstractUI));
egret.registerClass(HomeUI,'HomeUI');
//# sourceMappingURL=HomeUI.js.map