var FirstChargeBonusUI = (function (_super) {
    __extends(FirstChargeBonusUI, _super);
    function FirstChargeBonusUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }
    var d = __define,c=FirstChargeBonusUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
    };
    return FirstChargeBonusUI;
}(eui.Component));
egret.registerClass(FirstChargeBonusUI,'FirstChargeBonusUI');
