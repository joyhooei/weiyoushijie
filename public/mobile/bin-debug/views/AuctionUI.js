var AuctionUI = (function (_super) {
    __extends(AuctionUI, _super);
    function AuctionUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }
    var d = __define,c=AuctionUI,p=c.prototype;
    p.refresh = function () {
        this.uiCompHandler();
    };
    p.uiCompHandler = function () {
        var self = this;
        self.lblGold.text = application.format(application.customer.gold);
        //中午12点开标，所以12点之后的投标算明天的
        var dt = new Date();
        if (dt.getHours() >= 12) {
            dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
        }
        var today = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
        self.bid = { gold: 0, day: today, customer_id: application.customer.id, succeed: 0 };
        self.renderLastBid(today);
        self.renderMaxBid(today);
        self.grpTrack.x = self.imgThumb.x;
        self.lblTrack.text = "0%";
        self.imgFront.x = self.imgThumb.x;
        self.imgFront.y = self.imgThumb.y;
        self.imgFront.width = 0;
        self.renderCurrentBid(0);
        self.imgBid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onBid, this);
        self.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            this.back();
        }, this);
        self.grpTrack.touchEnabled = true;
        self.grpTrack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onBeginChangeBid, this);
        self.grpTrack.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.onChangeBid, this);
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
        this.bid.gold = Math.round(gold);
        this.lblCurrentBid.text = application.format(this.bid.gold + application.customer.locked_gold);
    };
    p.onBid = function () {
        var self = this;
        if (self.bid.gold > 0) {
            application.customer.gold -= self.bid.gold;
            application.customer.locked_gold += self.bid.gold;
            application.dao.save("Customer", application.customer, function (succeed, c) {
                if (succeed) {
                    self.bid.gold = application.customer.locked_gold;
                    application.dao.save("Bid", self.bid, function (succeed, bid) {
                        if (succeed) {
                            Toast.launch("投标成功");
                            self.back();
                        }
                        else {
                            Toast.launch("投标失败，请稍后再试");
                        }
                    });
                }
                else {
                    Toast.launch("投标失败，请稍后再试");
                }
            });
        }
        else {
            Toast.launch("请追加投标金币");
        }
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
