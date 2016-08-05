var WinUI = (function (_super) {
    __extends(WinUI, _super);
    function WinUI(bid) {
        var _this = this;
        _super.call(this, "winUISkin");
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, this);
        this.imgHide.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (application.me.attrs.hide_winner == 1) {
                application.me.attrs.hide_winner = 0;
            }
            else {
                application.me.attrs.hide_winner = 1;
            }
            _this.refresh();
        }, this);
    }
    var d = __define,c=WinUI,p=c.prototype;
    p.onRefresh = function () {
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
}(AbstractUI));
egret.registerClass(WinUI,'WinUI');
