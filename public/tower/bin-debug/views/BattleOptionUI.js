var BattleOptionUI = (function (_super) {
    __extends(BattleOptionUI, _super);
    function BattleOptionUI(cbStart, cbQuit) {
        var _this = this;
        _super.call(this, "battleOptionUISkin");
        this._result = application.battle.getResult();
        this._result.save();
        this.imgStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            cbStart();
            application.hideUI(_this);
        }, this);
        this.imgQuit.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            cbQuit();
            application.hideUI(_this);
        }, this);
    }
    var d = __define,c=BattleOptionUI,p=c.prototype;
    p.onRefresh = function () {
        if (this._result.attrs.result == 1) {
            this.imgResult.source = "end_win_png";
        }
        else {
            this.imgResult.source = "end_defeat_png";
        }
    };
    return BattleOptionUI;
}(AbstractUI));
egret.registerClass(BattleOptionUI,'BattleOptionUI');
//# sourceMappingURL=BattleOptionUI.js.map