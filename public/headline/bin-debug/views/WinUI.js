var WinUI = (function (_super) {
    __extends(WinUI, _super);
    function WinUI(bid) {
        var _this = this;
        _super.call(this);
        this.skinName = "resource/custom_skins/winUISkin.exml";
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Bid.earn(application.me);
            application.hideUI(_this);
        }, this);
        this.imgHide.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (application.me.attrs.hide_winner == 1) {
                application.me.attrs.hide_winner = 0;
            }
            else {
                application.me.attrs.hide_winner = 1;
            }
            _this.renderAvatar();
        }, this);
        this.renderAvatar();
    }
    var d = __define,c=WinUI,p=c.prototype;
    p.renderAvatar = function () {
        if (application.me.attrs.hide_winner == 1) {
            this.imgHide.source = "hidecancel_png";
            this.imgAvatar.source = "Ahide_png";
        }
        else {
            this.imgHide.source = "Awinhide_png";
            this.imgAvatar.source = Customer.avatarUrl(application.me.attrs);
        }
    };
    return WinUI;
}(eui.Component));
egret.registerClass(WinUI,'WinUI');
