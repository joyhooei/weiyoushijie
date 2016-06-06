var OfflineGoldUI = (function (_super) {
    __extends(OfflineGoldUI, _super);
    function OfflineGoldUI(gold, hour, minute) {
        var _this = this;
        _super.call(this);
        this.skinName = "resource/custom_skins/offlineGoldUISkin.exml";
        this.lblGold.text = application.format(gold);
        this.lblHour.text = hour;
        this.lblMinute.text = minute;
        this.imgOK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.customer.gold += gold;
            application.customer.accumulated_gold += gold;
            application.customer.offline_gold = 0;
            application.customer.offline_minutes = 0;
            application.customer.offline_hours = 0;
            application.saveCustomer();
            application.hideUI(_this);
        }, this);
    }
    var d = __define,c=OfflineGoldUI,p=c.prototype;
    return OfflineGoldUI;
}(eui.Component));
egret.registerClass(OfflineGoldUI,'OfflineGoldUI');
