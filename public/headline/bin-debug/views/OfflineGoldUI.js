var OfflineGoldUI = (function (_super) {
    __extends(OfflineGoldUI, _super);
    function OfflineGoldUI() {
        var _this = this;
        _super.call(this);
        this.skinName = "resource/custom_skins/offlineGoldUISkin.exml";
        this.lblGold.text = application.format(application.customer.offline_gold);
        this.lblHour.text = application.customer.offline_hours;
        this.lblMinute.text = application.customer.offline_minutes;
        this.imgOK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.earnOfflineGold();
            application.hideUI(_this);
        }, this);
    }
    var d = __define,c=OfflineGoldUI,p=c.prototype;
    return OfflineGoldUI;
}(eui.Component));
egret.registerClass(OfflineGoldUI,'OfflineGoldUI');
