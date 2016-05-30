var HelpUI = (function (_super) {
    __extends(HelpUI, _super);
    function HelpUI(content) {
        var _this = this;
        _super.call(this);
        this.skinName = "resource/custom_skins/helpUISkin.exml";
        this.lblContent.text = content;
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
    }
    var d = __define,c=HelpUI,p=c.prototype;
    return HelpUI;
}(eui.Component));
egret.registerClass(HelpUI,'HelpUI');
