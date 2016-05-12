var OfflineGoldUI = (function (_super) {
    __extends(OfflineGoldUI, _super);
    function OfflineGoldUI(gold, hour, minute) {
        _super.call(this);
        this.gold = gold;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/offlineGoldUISkin.exml";
        this.lblGold.text = application.format(gold);
        this.lblHour.text = hour;
        this.lblMinute.text = minute;
    }
    var d = __define,c=OfflineGoldUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.imgOK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.customer.gold += _this.gold;
            application.dao.save("Customer", application.customer, null);
            application.main.homeUI.animateCustomer(_this.gold, 0, 0, null);
            _this.parent.removeChild(_this);
        }, this);
    };
    return OfflineGoldUI;
}(eui.Component));
egret.registerClass(OfflineGoldUI,'OfflineGoldUI');
