var AuctionUI = (function (_super) {
    __extends(AuctionUI, _super);
    function AuctionUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }
    var d = __define,c=AuctionUI,p=c.prototype;
    p.refresh = function () {
        this.lblGold.text = application.format(application.customer.gold);
        this.lblDiamond.text = application.format(application.customer.diamond);
        var today = application.bidDay();
        this.renderLastBid(today);
        this.renderMaxBid(today);
        this.grpTrack.x = this.imgThumb.x;
        this.lblTrack.text = "0%";
        this.imgFront.x = this.imgThumb.x;
        this.imgFront.y = this.imgThumb.y;
        this.imgFront.width = 0;
        this.bid = { gold: 0, day: today, customer_id: application.customer.id, succeed: 0 };
        this.renderCurrentBid(0);
    };
    p.uiCompHandler = function () {
        this.refresh();
        this.imgBid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBid, this);
        this.grpTrack.touchEnabled = true;
        this.grpTrack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginChangeBid, this);
        this.grpTrack.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onChangeBid, this);
    };
    p.renderLastBid = function (today) {
        var self = this;
        application.dao.fetch("Bid", { succeed: 0, day: today, customer_id: application.customer.id }, { limit: 1 }, function (succeed, bids) {
            if (succeed && bids.length > 0) {
                self.bid = bids[0];
            }
            self.lblLastBid.text = application.format(self.bid.gold);
        });
    };
    p.renderMaxBid = function (today) {
        var self = this;
        application.dao.fetch("Bid", { succeed: 0, day: today }, { limit: 1, order: "gold DESC" }, function (succeed, bids) {
            if (succeed && bids.length > 0) {
                self.lblMaxBid.text = application.format(bids[0].gold);
            }
            else {
                self.lblMaxBid.text = "0";
            }
        });
    };
    p.renderCurrentBid = function (gold) {
        this.bid.gold = gold;
        this.lblCurrentBid.text = application.format(this.bid.gold);
    };
    p.onBid = function () {
        var self = this;
        application.dao.save("Bid", self.bid, function (succeed, bid) {
            if (succeed) {
                Toast.launch("投标成功");
                application.bid = self.bid;
                application.refreshCustomer(0 - self.bid.gold, 0, 0, 0, null);
                self.back();
            }
            else {
                Toast.launch("投标失败，请稍后再试");
            }
        });
    };
    p.back = function () {
        this.dispatchEventWith(GameEvents.EVT_RETURN);
    };
    p.onBeginChangeBid = function (e) {
        this.startX = e.stageX;
    };
    p.onChangeBid = function (e) {
        var step = e.stageX - this.startX;
        this.startX = e.stageX;
        var target = Math.max(this.imgThumb.x, this.grpTrack.x + step);
        target = Math.min(this.imgThumb.width + this.imgThumb.x - this.grpTrack.width, target);
        this.grpTrack.x = target;
        var percent = Math.round(100 * (this.grpTrack.x - this.imgThumb.x) / (this.imgThumb.width - this.grpTrack.width));
        this.lblTrack.text = percent.toString() + "%";
        this.renderCurrentBid(application.customer.gold * percent / 100);
        this.imgFront.width = this.grpTrack.x - this.imgThumb.x + 20;
    };
    return AuctionUI;
}(eui.Component));
egret.registerClass(AuctionUI,'AuctionUI');
