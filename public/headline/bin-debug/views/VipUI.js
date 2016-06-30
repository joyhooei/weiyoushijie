var VipUI = (function (_super) {
    __extends(VipUI, _super);
    function VipUI() {
        var _this = this;
        _super.call(this);
        this.skinName = "resource/custom_skins/vipUISkin.exml";
        if (application.vip.getLevel() > 0) {
            this.lblCharge.text = application.customer.charge;
        }
        else {
            this.lblCharge.visible = false;
        }
        this.imgTitle.source = "vt" + application.vip.getLevel() + "_png";
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
        this.imgCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
            application.showUI(new ChargeTipUI());
        }, this);
    }
    var d = __define,c=VipUI,p=c.prototype;
    return VipUI;
}(eui.Component));
egret.registerClass(VipUI,'VipUI');
