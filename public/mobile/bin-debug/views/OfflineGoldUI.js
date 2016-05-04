var OfflineGoldUI = (function (_super) {
    __extends(OfflineGoldUI, _super);
    function OfflineGoldUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }
    var d = __define,c=OfflineGoldUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
    };
    return OfflineGoldUI;
}(eui.Component));
egret.registerClass(OfflineGoldUI,'OfflineGoldUI');
