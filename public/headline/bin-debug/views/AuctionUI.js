var AuctionUI = (function (_super) {
    __extends(AuctionUI, _super);
    function AuctionUI() {
        _super.call(this, "auctionUISkin");
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.gotoHome();
        }, this);
        application.dao.addEventListener("Customer", function (evt) {
            this.lblGold.text = Utility.format(application.me.usableGold());
            this.lblDiamond.text = Utility.format(application.me.attrs.diamond);
        }, this);
        this.imgBid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBid, this);
        this.grpTrack.touchEnabled = true;
        this.grpTrack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginChangeBid, this);
        this.grpTrack.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onChangeBid, this);
        this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new BuyToolUI("time", 500));
        }, this);
        this.btnAddDiamond.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new ChargeTipUI());
        }, this);
        this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            HelpUI.showAuctionHelp();
        }, this);
    }
    var d = __define,c=AuctionUI,p=c.prototype;
    p.onRefresh = function () {
        this.lblGold.text = Utility.format(application.me.usableGold());
        this.lblDiamond.text = Utility.format(application.me.attrs.diamond);
        var today = Bid.day();
        this.renderLastBid(today);
        this.renderMaxBid(today);
        this.grpTrack.x = this.imgThumb.x;
        this.lblTrack.text = "0%";
        this.imgFront.x = this.imgThumb.x;
        this.imgFront.y = this.imgThumb.y;
        this.imgFront.width = 0;
        this.addGold = 0;
        this.bid = { gold: 0, day: today, customer_id: application.me.attrs.id, claimed: 0 };
        this.renderBid(0);
    };
    p.renderLastBid = function (today) {
        var self = this;
        application.dao.fetch("Bid", { succeed: 0, day: today, customer_id: application.me.attrs.id }, { limit: 1 }).then(function (bids) {
            if (bids.length > 0) {
                self.bid = bids[0];
                application.me.bid.attrs = self.bid;
                self.renderBid(self.addGold);
            }
        });
    };
    p.renderMaxBid = function (today) {
        var self = this;
        application.dao.fetch("MaxBid", { day: today }, { limit: 1 }).then(function (bids) {
            if (bids.length > 0) {
                self.lblMaxBid.text = Utility.format(bids[0].gold);
                self.lblMaxBidName.text = bids[0].name;
                self.imgMaxBidAvatar.source = bids[0].avatar;
            }
            else {
                self.lblMaxBid.text = "0";
                self.lblMaxBidName.text = "";
                self.imgMaxBidAvatar.source = "";
            }
        });
    };
    p.renderBid = function (gold) {
        this.addGold = Math.floor(gold);
        this.lblCurrentBid.text = Utility.format(this.addGold);
        this.lblLastBid.text = Utility.format(this.addGold + this.bid.gold);
    };
    p.onBid = function () {
        var self = this;
        if (self.bid.day == Bid.day()) {
            self.bid.gold += self.addGold;
            if (self.bid.gold > 0) {
                application.dao.fetch("Blacklist", { customer_id: application.me.attrs.id }, { limit: 1 }).then(function (blacks) {
                    if (blacks.length == 1) {
                        Toast.launch("对不起，您由于下列原因被封号：" + blacks[0].reason + "。");
                    }
                    else {
                        self.bid.claimed = 0;
                        application.dao.save("Bid", self.bid);
                        Gift.notify();
                        application.channel.track(TRACK_CATEGORY_ACTIVITY, TRACK_ACTION_JOIN, "投标");
                        Toast.launch("投标成功");
                        application.me.bid.attrs = self.bid;
                        if (application.guideUI) {
                            application.guideUI.next();
                        }
                        self.back();
                    }
                });
            }
            else {
                Toast.launch("投标的金币数量不能是0");
            }
        }
        else {
            Toast.launch("今天投标已经结束");
            application.me.bid.attrs = null;
            self.refresh();
        }
    };
    p.back = function () {
        application.gotoHome();
    };
    p.onBeginChangeBid = function (e) {
        this.startX = e.stageX;
    };
    p.onChangeBid = function (e) {
        if (e.stageX > this.startX) {
            var step = e.stageX - this.startX;
            this.startX = e.stageX;
            var target = Math.max(this.imgThumb.x, this.grpTrack.x + step);
            target = Math.min(this.imgThumb.width + this.imgThumb.x - this.grpTrack.width, target);
            this.grpTrack.x = target;
            var percent = Math.round(100 * (this.grpTrack.x - this.imgThumb.x) / (this.imgThumb.width - this.grpTrack.width));
            this.lblTrack.text = percent.toString() + "%";
            this.renderBid((Math.max(0, application.me.attrs.gold - this.bid.gold)) * percent / 100);
            this.imgFront.width = this.grpTrack.x - this.imgThumb.x + 20;
            this.nextStep();
        }
    };
    p.nextStep = function () {
        if (application.guideUI) {
            if (this.bid.gold + this.addGold > 0) {
                application.guideUI.next();
            }
        }
    };
    return AuctionUI;
}(AbstractUI));
egret.registerClass(AuctionUI,'AuctionUI');
