var BattleOptionUI = (function (_super) {
    __extends(BattleOptionUI, _super);
    function BattleOptionUI(cbStart, cbQuit) {
        var _this = this;
        _super.call(this, "battleOptionUISkin");
        if (application.battle.getLives() > 0) {
            this.imgResult.source = "end_win_png";
        }
        else {
            this.imgResult.source = "end_defeat_png";
        }
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
    return BattleOptionUI;
}(AbstractUI));
egret.registerClass(BattleOptionUI,'BattleOptionUI');
//# sourceMappingURL=BattleOptionUI.js.map