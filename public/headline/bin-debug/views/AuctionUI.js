var AuctionUI = (function (_super) {
    __extends(AuctionUI, _super);
    function AuctionUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/auctionUISkin.exml";
    }
    var d = __define,c=AuctionUI,p=c.prototype;
    p.refresh = function () {
        this.lblGold.text = application.format(application.usableGold());
        this.lblDiamond.text = application.format(application.customer.diamond);
        var today = application.bidDay();
        this.renderLastBid(today);
        this.renderMaxBid(today);
        this.grpTrack.x = this.imgThumb.x;
        this.lblTrack.text = "0%";
        this.imgFront.x = this.imgThumb.x;
        this.imgFront.y = this.imgThumb.y;
        this.imgFront.width = 0;
        this.addGold = 0;
        this.bid = { gold: 0, day: today, customer_id: application.customer.id, claimed: 0 };
        this.renderBid(0);
    };
    p.uiCompHandler = function () {
        this.refresh();
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.gotoHome();
        }, this);
        application.dao.addEventListener("Customer", function (evt) {
            this.lblGold.text = application.format(application.usableGold());
            this.lblDiamond.text = application.format(application.customer.diamond);
        }, this);
        this.imgBid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBid, this);
        this.grpTrack.touchEnabled = true;
        this.grpTrack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginChangeBid, this);
        this.grpTrack.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onChangeBid, this);
        this.grpTrack.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndChangeBid, this);
        this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new BuyToolUI("time", 500));
        }, this);
        this.btnAddDiamond.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new ChargeTipUI());
        }, this);
        this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            var content = "1. 每天中午12点拍卖结束。\n";
            content += "2. 出价最高者成为今日头条，获得1枚勋章和2000个钻石的奖励。\n";
            content += "3. 未中标玩家的拍卖金币自动返还。\n";
            content += "4. 拍卖期间，系统自动显示截至上个小时的最高出价，为新出价的玩家提供参考。\n";
            content += "5. 玩家在拍卖结束前可以反复加价，每次加价最高为当前拥有的所有金币。\n";
            content += "6. 每天首次参加拍卖可以在礼物页面中领取100钻石奖励。\n";
            application.showHelp(content);
        }, this);
    };
    p.renderLastBid = function (today) {
        var self = this;
        application.dao.fetch("Bid", { succeed: 0, day: today, customer_id: application.customer.id }, { limit: 1 }, function (succeed, bids) {
            if (succeed && bids.length > 0) {
                self.bid = bids[0];
                application.bid = self.bid;
                self.renderBid(self.addGold);
            }
        });
    };
    p.renderMaxBid = function (today) {
        var self = this;
        application.dao.fetch("MaxBid", { day: today }, { limit: 1 }, function (succeed, bids) {
            if (succeed && bids.length > 0) {
                self.lblMaxBid.text = application.format(bids[0].gold);
            }
            else {
                self.lblMaxBid.text = "0";
            }
        });
    };
    p.renderBid = function (gold) {
        this.addGold = Math.floor(gold);
        this.lblCurrentBid.text = application.format(this.addGold);
        this.lblLastBid.text = application.format(this.addGold + this.bid.gold);
    };
    p.onBid = function () {
        var self = this;
        if (self.bid.day == application.bidDay()) {
            self.bid.gold += self.addGold;
            if (self.bid.gold > 0) {
                self.bid.claimed = 0;
                application.dao.save("Bid", self.bid);
                application.giftChanged();
                esa.EgretSA.onJoinActivity("投标");
                Toast.launch("投标成功");
                application.bid = self.bid;
                if (application.guideUI) {
                    application.guideUI.next();
                }
                self.back();
            }
            else {
                Toast.launch("投标的金币数量不能是0");
            }
        }
        else {
            Toast.launch("今天投标已经结束");
            application.bid = null;
            self.refresh();
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
        this.renderBid((application.customer.gold - this.bid.gold) * percent / 100);
        this.imgFront.width = this.grpTrack.x - this.imgThumb.x + 20;
    };
    p.onEndChangeBid = function (e) {
        if (application.guideUI) {
            if (this.bid.gold + this.addGold > 0) {
                application.guideUI.next();
            }
            else {
                Toast.launch("投标的金币数量不能是0");
            }
        }
    };
    return AuctionUI;
}(eui.Component));
egret.registerClass(AuctionUI,'AuctionUI');
