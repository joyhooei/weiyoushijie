var FirstChargeBonusUI = (function (_super) {
    __extends(FirstChargeBonusUI, _super);
    function FirstChargeBonusUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/firstChargeBonusUISkin.exml";
    }
    var d = __define,c=FirstChargeBonusUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        var self = this;
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.parent.removeChild(_this);
        }, this);
        this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.charge();
        }, this);
    };
    return FirstChargeBonusUI;
}(eui.Component));
egret.registerClass(FirstChargeBonusUI,'FirstChargeBonusUI');
