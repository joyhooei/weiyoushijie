var FirstChargeBonusUI = (function (_super) {
    __extends(FirstChargeBonusUI, _super);
    function FirstChargeBonusUI() {
        var _this = this;
        _super.call(this);
        this.skinName = "resource/custom_skins/firstChargeBonusUISkin.exml";
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
        this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.charge();
        }, this);
    }
    var d = __define,c=FirstChargeBonusUI,p=c.prototype;
    return FirstChargeBonusUI;
}(eui.Component));
egret.registerClass(FirstChargeBonusUI,'FirstChargeBonusUI');
