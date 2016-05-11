var HelpUI = (function (_super) {
    __extends(HelpUI, _super);
    function HelpUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/helpUISkin.exml";
    }
    var d = __define,c=HelpUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
    };
    return HelpUI;
}(eui.Component));
egret.registerClass(HelpUI,'HelpUI');
