var ChargeTipUI = (function (_super) {
    __extends(ChargeTipUI, _super);
    function ChargeTipUI() {
        var _this = this;
        _super.call(this);
        this.skinName = "resource/custom_skins/chargeTipUISkin.exml";
        this.imgCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
        this.imgCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.charge();
        }, this);
    }
    var d = __define,c=ChargeTipUI,p=c.prototype;
    return ChargeTipUI;
}(eui.Component));
egret.registerClass(ChargeTipUI,'ChargeTipUI');
