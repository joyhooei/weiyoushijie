var WinUI = (function (_super) {
    __extends(WinUI, _super);
    function WinUI(bid) {
        var _this = this;
        _super.call(this);
        this.skinName = "resource/custom_skins/winUISkin.exml";
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.customer.win_day = bid.day;
            application.customer.gold -= bid.gold;
            application.customer.metal++;
            application.customer.diamond += 2000;
            application.customer.gold += application.customer.offline_gold;
            application.customer.accumulated_gold += application.customer.offline_gold;
            application.customer.offline_gold = 0;
            application.customer.offline_minutes = 0;
            application.customer.offline_hours = 0;
            application.saveCustomer();
            application.hideUI(_this);
        }, this);
        this.imgHide.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (application.customer.hide_winner == 1) {
                application.customer.hide_winner = 0;
            }
            else {
                application.customer.hide_winner = 1;
            }
            _this.renderAvatar();
        }, this);
        this.renderAvatar();
    }
    var d = __define,c=WinUI,p=c.prototype;
    p.renderAvatar = function () {
        if (application.customer.hide_winner == 1) {
            this.imgHide.source = "hidecancel_png";
            this.imgAvatar.source = "Ahide_png";
        }
        else {
            this.imgHide.source = "Awinhide_png";
            this.imgAvatar.source = application.avatarUrl(application.customer);
        }
    };
    return WinUI;
}(eui.Component));
egret.registerClass(WinUI,'WinUI');
