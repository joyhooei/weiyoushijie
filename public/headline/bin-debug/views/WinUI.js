var WinUI = (function (_super) {
    __extends(WinUI, _super);
    function WinUI(bid) {
        var _this = this;
        _super.call(this);
        this.skinName = "resource/custom_skins/winUISkin.exml";
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var self = this;
            application.dao.fetch("Bid", { customer_id: application.customer.id, succeed: 1, claimed: 0 }, {}, function (succeed, bids) {
                if (succeed) {
                    for (var i = 0; i < bids.length; i++) {
                        application.customer.gold -= bids[i].gold;
                        application.customer.metal++;
                        application.customer.diamond += 2000;
                        bids[i].claimed = 1;
                        application.dao.save("Bid", bids[i]);
                    }
                }
                application.earnGold(application.customer.offline_gold);
                application.hideUI(self);
            });
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
