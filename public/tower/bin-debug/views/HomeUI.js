var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        _super.call(this, "homeUISkin");
        this.imgBattle1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.showUI(new BattleLoadingUI(1, 1));
        }, this);
    }
    var d = __define,c=HomeUI,p=c.prototype;
    return HomeUI;
}(AbstractUI));
egret.registerClass(HomeUI,'HomeUI');
//# sourceMappingURL=HomeUI.js.map