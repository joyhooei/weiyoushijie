var GiftUI = (function (_super) {
    __extends(GiftUI, _super);
    function GiftUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/giftUISkin.exml";
        this.imgPicks = [this.imgPick1, this.imgPick2, this.imgPick3, this.imgPick4, this.imgPick5, this.imgPick6, this.imgPick7, this.imgPick8];
        for (var i = 0; i < this.imgPicks.length; i++) {
            this.imgPicks[i].visible = false;
        }
        this.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.hideUI(this);
        }, this);
        this.imgPick1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.pickGift(this.gift(GiftCategory.Login));
        }, this);
        this.imgPick2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.pickGift(this.gift(GiftCategory.Online));
        }, this);
        this.imgPick3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.pickBidGift();
        }, this);
        this.imgPick4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.pickTicketGift();
        }, this);
        this.imgPick5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.pickShareGift();
        }, this);
        this.imgPick6.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.pickFirstChargeGift();
        }, this);
        this.imgPick7.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.pickOutputGift();
        }, this);
        this.imgPick8.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.pickAttentionGift();
        }, this);
    }
    var d = __define,c=GiftUI,p=c.prototype;
    p.pickGift = function (gift) {
        if (gift.locked == 0) {
            this.lockGift(gift, 2);
            this.updateCustomer(gift);
        }
    };
    p.pickBidGift = function () {
        var gift = this.gift(GiftCategory.Bid);
        if (gift.locked == 0) {
            this.pickGift(gift);
        }
        else if (gift.locked == 1) {
            application.hideUI(this);
            application.gotoAuction();
        }
    };
    p.pickTicketGift = function () {
        var gift = this.gift(GiftCategory.Ticket);
        if (gift.locked == 0) {
            this.pickGift(gift);
        }
        else if (gift.locked == 1) {
            application.hideUI(this);
            application.gotoTool();
        }
    };
    p.pickShareGift = function () {
        var self = this;
        var gift = self.gift(GiftCategory.Share);
        if (gift.locked == 0) {
            self.pickGift(gift);
        }
        else if (gift.locked == 1) {
            var url = application.baseUrl + "headline/bin-release/web/bin-release/index.html?platInfo=open_90359_9166&appId=90359&egret.runtime.spid=9166&appId=90359&channelId=9166&isNewApi=1&egretSdkDomain=http://api.egret-labs.org/v2&egretServerDomain=http://api.egret-labs.org/v2&egretRv=669";
            var img_url = application.baseUrl + "headline/resource/art/home/icon.png";
            var options = { title: '我来上头条，女神任我挑！', description: '最炫最浪的舞蹈经营类游戏，无需下载，点开即送，多重豪礼等你来拿！', url: url, img_url: img_url, img_title: '头条关注' };
            application.channel.share(options).then(function () {
                Toast.launch("分享成功，请领取礼物");
                self.lockGift(gift, 0);
            }, function (error) {
                Toast.launch(error);
            });
        }
    };
    p.pickFirstChargeGift = function () {
        var gift = this.gift(GiftCategory.Charge);
        if (gift.locked == 0) {
            this.pickGift(gift);
        }
        else if (gift.locked == 1) {
            application.hideUI(this);
            application.showUI(new FirstChargeBonusUI());
        }
    };
    p.pickOutputGift = function () {
        var gift = this.gift(GiftCategory.Output);
        if (gift.locked == 0) {
            //修改下一个可以领取的秒产
            var nextOutput = 10 * gift.data;
            gift.data = nextOutput.toString();
            //如果用户的秒产超过了下一个可以领取的秒产，则仍然保持解锁状态
            if (Utility.log10(application.me.attrs.output) >= Utility.log10(nextOutput)) {
                this.lockGift(gift, 0);
            }
            else {
                this.lockGift(gift, 2);
            }
            this.lblOutputGift.text = Utility.format(nextOutput);
            this.updateCustomer(gift);
        }
    };
    p.pickAttentionGift = function () {
        var self = this;
        var gift = self.gift(GiftCategory.Attention);
        if (gift.locked == 0) {
            self.pickGift(gift);
        }
        else if (gift.locked == 1) {
            application.channel.attention({}).then(function () {
                Toast.launch("关注成功，请领取礼物");
                self.lockGift(gift, 0);
            }, function (error) {
                Toast.launch(error);
            });
        }
    };
    p.lockGift = function (gift, lock) {
        gift.locked = lock;
        this.renderGift(gift);
        if (lock == 2) {
            gift.last_pick_day = (new Date()).toString();
        }
        application.dao.save("Gift", gift);
    };
    p.refresh = function () {
        this.uiCompHandler();
    };
    p.uiCompHandler = function () {
        var self = this;
        Gift.check(application.me).then(function (gifts) {
            self.gifts = gifts;
            for (var i = 0; i < self.imgPicks.length; i++) {
                self.imgPicks[i].visible = true;
            }
            //1、登录200钻。每天领取一次
            self.renderGift(self.gift(GiftCategory.Login));
            self.renderOnlineGift();
            //3、拍卖100钻。每天领取一次。灰色点击直接跳去拍卖页面。
            self.renderGift(self.gift(GiftCategory.Bid));
            self.renderTicketGift();
            //5、分享100钻。每天任意在微博，微信等地方分享一次就可以领取。灰色时点击跳入分享页面。
            self.renderGift(self.gift(GiftCategory.Share));
            //6、首冲 1500钻+1勋章+1M 金币。 只能领取一次，不再刷新。灰色时点击跳转首冲页面。
            self.renderGift(self.gift(GiftCategory.Charge));
            self.renderOutputGift();
            //8、关注
            self.renderGift(self.gift(GiftCategory.Attention));
        });
    };
    //2、在线奖励，每天200钻。
    //如果今天的在线时间礼物还没有领取，检查一下是否可以领取了
    p.renderOnlineGift = function () {
        var gift = this.gift(GiftCategory.Online);
        this.lblOnlineGiftTimeout.text = "";
        if (gift.locked == 1) {
            this.onlineGiftTimeout = parseInt(gift.data);
            var timer = new egret.Timer(1000, this.onlineGiftTimeout);
            timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
                this.lblOnlineGiftTimeout.text = (Math.floor(this.onlineGiftTimeout / 60)).toString() + ":" + (Math.floor(this.onlineGiftTimeout % 60)).toString();
                if (this.onlineGiftTimeout > 0) {
                    this.onlineGiftTimeout -= 1;
                }
            }, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (event) {
                //时间到了，可以领取了
                this.lockGift(gift, 0);
            }, this);
            timer.start();
        }
        this.renderGift(gift);
    };
    p.renderTicketGift = function () {
        //4、永久会员/月票 300钻。每天领取一次。灰色是点击跳入会员购买页面（参照道具弹出窗口） 月票默认30天，会显示剩余月票天数，如果是永久则显示永久
        var gift = this.gift(GiftCategory.Ticket);
        if (application.me.attrs.vip == 0) {
            this.lblTicketGiftTimeout.text = "";
        }
        else {
            var now = new Date();
            if (application.me.attrs.vip == 2) {
                this.lblTicketGiftTimeout.text = "永久";
            }
            else {
                var ticketTimeout = new Date(application.me.attrs.ticket);
                var timeDiff = ticketTimeout.getTime() - now.getTime();
                var diffDays = Math.min(30, Math.floor(timeDiff / (1000 * 3600 * 24)));
                if (diffDays <= 0) {
                    this.lblTicketGiftTimeout.text = "";
                    application.me.resetTicket(0);
                }
                else {
                    this.lblTicketGiftTimeout.text = diffDays.toString() + "天";
                }
            }
        }
        this.renderGift(gift);
    };
    p.renderOutputGift = function () {
        //7、秒产每增加一个数量级，就得100个钻石
        var gift = this.gift(GiftCategory.Output);
        this.lblOutputGift.text = Utility.format(gift.data);
        this.renderGift(gift);
    };
    p.gift = function (category) {
        return this.gifts[category - 1];
    };
    p.renderGift = function (gift) {
        var imgPic = this.imgPicks[gift.category - 1];
        if (gift.locked == 1) {
            if (gift.category == GiftCategory.Share) {
                imgPic.source = "share_png";
            }
            else if (gift.category == GiftCategory.Attention) {
                imgPic.source = "att_png";
            }
            else {
                imgPic.source = "unpick_png";
            }
        }
        else if (gift.locked == 0) {
            imgPic.source = "pick_png";
        }
        else {
            imgPic.source = "picked_png";
        }
    };
    p.updateCustomer = function (gift) {
        var self = this;
        var tip = "";
        if (gift.diamond > 0) {
            tip += "获得" + gift.diamond.toString() + "钻石";
            application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_INC, "礼物奖励", gift.diamond);
        }
        if (gift.gold > 0) {
            if (tip.length > 0) {
                tip += "，";
            }
            else {
                tip += "获得";
            }
            tip += gift.gold.toString() + "金币";
        }
        if (gift.metal > 0) {
            if (tip.length > 0) {
                tip += "，";
            }
            else {
                tip += "获得";
            }
            tip += gift.metal.toString() + "奖章";
        }
        Toast.launch(tip);
        application.me.attrs.metal += gift.metal;
        application.me.attrs.gold += gift.gold;
        application.me.attrs.diamond += gift.diamond;
        application.me.saveNow();
    };
    return GiftUI;
}(eui.Component));
egret.registerClass(GiftUI,'GiftUI');
