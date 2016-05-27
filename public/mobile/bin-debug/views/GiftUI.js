var GiftUI = (function (_super) {
    __extends(GiftUI, _super);
    function GiftUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/giftUISkin.exml";
        this.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.hideUI(this);
        }, this);
        this.imgPick1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.onLoginGift();
        }, this);
        this.imgPick2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.onOnlineGift();
        }, this);
        this.imgPick3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.onBidGift();
        }, this);
        this.imgPick4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.onTicketGift();
        }, this);
        this.imgPick5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.onShareGift();
        }, this);
        this.imgPick6.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.onFirstChargeGift();
        }, this);
        this.imgPick7.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.onOutputGift();
        }, this);
        this.imgPick8.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (ev) {
            this.onAttentionGift();
        }, this);
    }
    var d = __define,c=GiftUI,p=c.prototype;
    p.onLoginGift = function () {
        this.pick(0, this.imgPick1);
    };
    p.onOnlineGift = function () {
        this.pick(1, this.imgPick2);
    };
    p.onBidGift = function () {
        if (this.gifts[2].locked == 0) {
            this.pick(2, this.imgPick3);
        }
        else if (this.gifts[2].locked == 1) {
            application.hideUI(this);
            application.gotoAuction();
        }
    };
    p.onTicketGift = function () {
        if (this.gifts[3].locked == 0) {
            this.pick(3, this.imgPick4);
        }
        else if (this.gifts[3].locked == 1) {
            application.hideUI(this);
            application.gotoTool();
        }
    };
    p.onShareGift = function () {
        var self = this;
        if (self.gifts[4].locked == 0) {
            self.pick(4, self.imgPick5);
        }
        else if (self.gifts[4].locked == 1) {
            application.share(function () {
                self.gifts[4].locked = 0;
                application.dao.save("Gift", self.gifts[4], null);
                self.setImage(self.imgPick5, self.gifts[4]);
            });
        }
    };
    p.onFirstChargeGift = function () {
        if (this.gifts[5].locked == 0) {
            this.pick(5, this.imgPick6);
        }
        else if (this.gifts[5].locked == 1) {
            application.hideUI(this);
            application.showUI(new FirstChargeBonusUI());
        }
    };
    p.onOutputGift = function () {
        var gift = this.gifts[6];
        if (application.log10(application.customer.output) > application.log10(parseInt(gift.data))) {
            this.pick(1, this.imgPick7);
        }
        else {
            if (gift.locked == 0) {
                this.income(gift, this.imgPick7);
            }
        }
    };
    p.onAttentionGift = function () {
        var self = this;
        if (self.gifts[7].locked == 0) {
            self.pick(7, self.imgPick8);
        }
        else if (self.gifts[7].locked == 1) {
            application.attention(function () {
                self.gifts[7].locked = 0;
                application.dao.save("Gift", self.gifts[7], null);
                self.setImage(self.imgPick8, self.gifts[7]);
            });
        }
    };
    p.refresh = function () {
        this.uiCompHandler();
    };
    p.uiCompHandler = function () {
        var self = this;
        application.dao.fetch("Gift", { customer_id: application.customer.id }, { order: 'category ASC' }, function (succeed, gifts) {
            //1、登录200钻。每天领取一次
            self.setImage(self.imgPick1, gifts[0]);
            //2、在线奖励，每天200钻。
            //如果今天的在线时间礼物还没有领取，检查一下是否可以领取了
            if (gifts[1].locked == 1) {
                var lastLogin = new Date(application.customer.last_login);
                var today = new Date();
                var diff = (today.getTime() - lastLogin.getTime()) / 1000;
                if (diff > 60 * 60) {
                    //已经过了一小时，可以领取了
                    gifts[1].locked = 0;
                }
                else {
                    //在线还不到1个小时，启动定时器
                    var timer = new egret.Timer(1000, diff);
                    self.onlineGiftTimeout = diff;
                    timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
                        self.lblOnlineGiftTimeout.text = (Math.floor(self.onlineGiftTimeout / 60)).toString() + ":" + (Math.floor(self.onlineGiftTimeout % 60)).toString();
                        self.onlineGiftTimeout -= 1;
                    }, self);
                    timer.start();
                }
            }
            self.setImage(self.imgPick2, gifts[1]);
            //3、拍卖100钻。每天领取一次。灰色点击直接跳去拍卖页面。
            self.setImage(self.imgPick3, gifts[2]);
            //4、永久会员/月票 300钻。每天领取一次。灰色是点击跳入会员购买页面（参照道具弹出窗口） 月票默认30天，会显示剩余月票天数，如果是永久则显示永久
            if (application.customer.ticket && application.customer.ticket.length > 1) {
                var ticketTimeout = new Date(application.customer.ticket);
                var now = new Date();
                ;
                var timeDiff = ticketTimeout.getTime() - now.getTime();
                if (timeDiff < 0) {
                    self.lblTicketGiftTimeout.text = "";
                }
                else {
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (diffDays > 30) {
                        self.lblTicketGiftTimeout.text = "永久";
                    }
                    else {
                        self.lblTicketGiftTimeout.text = diffDays.toString() + "天";
                    }
                }
            }
            else {
                self.lblTicketGiftTimeout.text = "";
            }
            self.setImage(self.imgPick4, gifts[3]);
            //5、分享100钻。每天任意在微博，微信等地方分享一次就可以领取。灰色时点击跳入分享页面。
            self.setImage(self.imgPick5, gifts[4]);
            //6、首冲 1500钻+1勋章+1M 金币。 只能领取一次，不再刷新。灰色时点击跳转首冲页面。
            self.setImage(self.imgPick6, gifts[5]);
            //7、秒产每增加一个数量级，就得100个钻石
            if (gifts[6].data && gifts[6].data.length > 0) {
                self.lblOutputGift.text = application.format(parseInt(gifts[6].data) * 10);
            }
            else {
                self.lblOutputGift.text = "100";
            }
            self.setImage(self.imgPick7, gifts[6]);
            //8、关注
            self.setImage(self.imgPick8, gifts[7]);
            self.gifts = gifts;
        });
    };
    p.setImage = function (imgPic, gift) {
        if (gift.locked == 1) {
            if (gift.category == 5) {
                imgPic.source = "share_png";
            }
            else if (gift.category == 8) {
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
    p.pick = function (index, imgPic) {
        var gift = this.gifts[index];
        if (gift.locked == 0) {
            gift.locked = 2;
            application.dao.save("Gift", gift);
            this.income(gift, imgPic);
        }
    };
    p.income = function (gift, imgPic) {
        var self = this;
        application.customer.metal += gift.metal;
        application.customer.gold += gift.gold;
        application.customer.diamond += gift.diamond;
        application.dao.save("Customer", application.customer, function (succeed, c) {
            if (succeed) {
                application.refreshCustomer(-gift.gold, -gift.diamond, 0, 0, null);
                self.setImage(gift, imgPic);
            }
        });
    };
    return GiftUI;
}(eui.Component));
egret.registerClass(GiftUI,'GiftUI');
