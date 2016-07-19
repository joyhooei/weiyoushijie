var VipUI = (function (_super) {
    __extends(VipUI, _super);
    function VipUI() {
        var _this = this;
        _super.call(this);
        this.level = application.me.vip.getLevel();
        this.skinName = "resource/custom_skins/vipUISkin.exml";
        this.refresh();
        this.imgNext.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.level++;
            _this.refresh();
        }, this);
        this.imgLast.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.level--;
            _this.refresh();
        }, this);
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
        this.imgCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
            application.showUI(new ChargeTipUI());
        }, this);
    }
    var d = __define,c=VipUI,p=c.prototype;
    p.refresh = function () {
        if (this.level == 0) {
            this.lblCharge.visible = false;
            this.imgLast.visible = false;
            this.imgNext.visible = true;
        }
        else {
            this.lblCharge.visible = true;
            this.imgLast.visible = true;
            if (this.level == 15) {
                this.imgNext.visible = false;
            }
            else {
                this.imgNext.visible = true;
            }
        }
        this.lblCharge.text = application.me.attrs.charge;
        this.imgTitle.source = "vt" + this.level + "_png";
    };
    return VipUI;
}(eui.Component));
egret.registerClass(VipUI,'VipUI');
