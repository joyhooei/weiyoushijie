var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        var _this = this;
        _super.call(this, "homeUISkin");
        this.imgBattle1.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this._startBattle(2);
        }, this);
    }
    var d = __define,c=HomeUI,p=c.prototype;
    p._startBattle = function (stage) {
        this.show(new BattleLoadingUI(stage, 1));
    };
    return HomeUI;
}(AbstractUI));
egret.registerClass(HomeUI,'HomeUI');
//# sourceMappingURL=HomeUI.js.map