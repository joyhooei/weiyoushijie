var AuctionUI = (function (_super) {
    __extends(AuctionUI, _super);
    function AuctionUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }
    var d = __define,c=AuctionUI,p=c.prototype;
    p.uiCompHandler = function () {
        var self = this;
        self.lblGold.text = application.format(application.customer.gold);
        var dt = new Date();
        var today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
        application.dao.fetch("Bid", { succeed: 0, day: today }, { limit: 1 }, function (succeed, bids) {
            if (succeed && bids.length > 0) {
                self.bid = bids[0];
            }
            else {
                self.bid = { gold: 0, day: today, customer_id: application.customer.id, succeed: 0 };
            }
            self.lblLastBid.text = application.format(self.bid.gold);
        });
        application.dao.fetch("Bid", { succeed: 0, day: today }, { limit: 1, order: "gold DESC" }, function (succeed, bids) {
            if (succeed && bids.length > 0) {
                self.lblMaxBid.text = application.format(bids[0].gold);
            }
            else {
                self.lblMaxBid.text = "0";
            }
        });
        self.lblCurrentBid.text = "0";
        self.gold = 0;
        self.btnBid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.bid.gold = self.gold;
            application.dao.save("Bid", self.bid, null);
            self.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
        self.grpTrack.touchEnabled = true;
        self.grpTrack.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            console.log('touch move', e);
            var tx = e.localX;
            tx = Math.max(self.imgThumb.x, tx);
            tx = Math.min(self.imgThumb.width + self.imgThumb.x - this.grpTrack.width, tx);
            self.grpTrack.x = tx;
            var percent = Math.round(100 * (tx - self.imgThumb.x) / (self.imgThumb.width - self.grpTrack.width));
            self.lblTrack.text = percent.toString() + "%";
            self.imgFront.width = tx - self.imgThumb.x;
            self.gold = Math.round(application.customer.gold * percent / 100);
            self.lblCurrentBid.text = application.format(self.gold);
        }, this);
    };
    return AuctionUI;
}(eui.Component));
egret.registerClass(AuctionUI,'AuctionUI');
