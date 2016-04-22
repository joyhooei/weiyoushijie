/**
 * Created by egret on 2016/1/26.
 */
var AuctionUI = (function (_super) {
    __extends(AuctionUI, _super);
    function AuctionUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }
    var d = __define,c=AuctionUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
    };
    return AuctionUI;
}(eui.Component));
egret.registerClass(AuctionUI,'AuctionUI');
