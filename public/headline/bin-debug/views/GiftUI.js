var GiftCategory;
(function (GiftCategory) {
    GiftCategory[GiftCategory["Login"] = 1] = "Login";
    GiftCategory[GiftCategory["Online"] = 2] = "Online";
    GiftCategory[GiftCategory["Bid"] = 3] = "Bid";
    GiftCategory[GiftCategory["Ticket"] = 4] = "Ticket";
    GiftCategory[GiftCategory["Share"] = 5] = "Share";
    GiftCategory[GiftCategory["Charge"] = 6] = "Charge";
    GiftCategory[GiftCategory["Output"] = 7] = "Output";
    GiftCategory[GiftCategory["Attention"] = 8] = "Attention";
})(GiftCategory || (GiftCategory = {}));
var GiftUI = (function (_super) {
    __extends(GiftUI, _super);
    function GiftUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/giftUISkin.exml";
        this.imgPicks = [this.imgPick1, this.imgPick2, this.imgPick3, this.imgPick4, this.imgPick5, this.imgPick6, this.imgPick7, this.imgPick8];
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
            application.share(function () {
                self.lockGift(gift, 0);
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
            if (application.log10(application.customer.output) >= application.log10(nextOutput)) {
                this.lockGift(gift, 0);
            }
            else {
                this.lockGift(gift, 2);
            }
            this.lblOutputGift.text = application.format(nextOutput);
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
            application.attention(function () {
                self.lockGift(gift, 0);
            });
        }
    };
    p.lockGift = function (gift, lock) {
        gift.locked = lock;
        this.renderGift(gift);
        application.dao.save("Gift", gift);
    };
    p.refresh = function () {
        this.uiCompHandler();
    };
    p.uiCompHandler = function () {
        var self = this;
        application.dao.fetch("Gift", { customer_id: application.customer.id }, { order: 'category ASC' }, function (succeed, gifts) {
            if (succeed) {
                self.gifts = gifts;
                //如果到了第二天，将所有已经领取礼物重新修改为可以领取
                var day = 1000 * 60 * 60 * 24;
                var now = Math.floor((new Date()).getTime() / day);
                for (var i = 0; i < gifts.length; i++) {
                    if (gifts[i].category != 6 && gifts[i].locked == 2) {
                        var dt = Math.floor((new Date(gifts[i].update_time)).getTime() / day);
                        if (now > dt) {
                            gifts[i].locked = 1;
                        }
                    }
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
            }
        });
    };
    //2、在线奖励，每天200钻。
    //如果今天的在线时间礼物还没有领取，检查一下是否可以领取了
    p.renderOnlineGift = function () {
        var gift = this.gift(GiftCategory.Online);
        this.lblOnlineGiftTimeout.text = "";
        if (gift.locked == 1) {
            var lastLogin = new Date(application.customer.last_login);
            var today = new Date();
            var diff = Math.floor((today.getTime() - lastLogin.getTime()) / 1000);
            if (diff > 60 * 60) {
                //已经过了一小时，可以领取了
                this.lockGift(gift, 0);
            }
            else {
                //在线还不到1个小时，启动定时器
                this.onlineGiftTimeout = 3600 - diff;
                var timer = new egret.Timer(1000, this.onlineGiftTimeout);
                timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
                    this.lblOnlineGiftTimeout.text = (Math.floor(this.onlineGiftTimeout / 60)).toString() + ":" + (Math.floor(this.onlineGiftTimeout % 60)).toString();
                    if (this.onlineGiftTimeout > 0) {
                        this.onlineGiftTimeout -= 1;
                    }
                }, this);
                timer.addEventListener(egret.TimerEvent.COMPLETE, function (event) {
                    //时间到了，可以领取了
                    this.lockGift(gift, 0);
                }, this);
                timer.start();
                this.renderGift(gift);
            }
        }
        else {
            this.renderGift(gift);
        }
    };
    p.renderTicketGift = function () {
        //4、永久会员/月票 300钻。每天领取一次。灰色是点击跳入会员购买页面（参照道具弹出窗口） 月票默认30天，会显示剩余月票天数，如果是永久则显示永久
        var gift = this.gift(GiftCategory.Ticket);
        if (application.customer.vip == 0) {
            this.lblTicketGiftTimeout.text = "";
        }
        else if (application.customer.vip == 2) {
            this.lblTicketGiftTimeout.text = "永久";
        }
        else {
            var ticketTimeout = new Date(application.customer.ticket);
            var now = new Date();
            ;
            var timeDiff = ticketTimeout.getTime() - now.getTime();
            if (timeDiff < 0) {
                this.lblTicketGiftTimeout.text = "";
            }
            else {
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                this.lblTicketGiftTimeout.text = diffDays.toString() + "天";
            }
        }
        this.renderGift(gift);
    };
    p.renderOutputGift = function () {
        //7、秒产每增加一个数量级，就得100个钻石
        var gift = this.gift(GiftCategory.Output);
        this.lblOutputGift.text = application.format(gift.data);
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
            esa.EgretSA.onDiamondReward(gift.diamond, "礼物奖励");
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
        application.customer.metal += gift.metal;
        application.customer.gold += gift.gold;
        application.customer.diamond += gift.diamond;
        application.saveCustomer();
    };
    return GiftUI;
}(eui.Component));
egret.registerClass(GiftUI,'GiftUI');
