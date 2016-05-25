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
        if (application.log10(application.customer.output) > parseInt(gift.data)) {
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
            self.setImage(self.imgPick1, gifts[0]);
            self.setImage(self.imgPick2, gifts[1]);
            self.setImage(self.imgPick3, gifts[2]);
            //如果今天的在线时间礼物还没有领取，检查一下是否可以领取了
            if (gifts[3].locked == 1) {
                var lastLogin = new Date(application.customer.last_login);
                var today = new Date();
                var diff = (today.getTime() - lastLogin.getTime()) / 1000;
                if (diff > 60 * 60) {
                    //已经过了一小时，可以领取了
                    gifts[3].locked = 0;
                }
                else {
                    //在线还不到1个小时，启动定时器
                    var timer = new egret.Timer(1000, diff);
                    this.onlineGiftTimeout = diff;
                    timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
                        this.lblOnlineGiftTimeout.text = (Math.floor(this.onlineGiftTimeout / 60)).toString() + "：" + (this.onlineGiftTimeout % 60).toString();
                        this.onlineGiftTimeout -= 1;
                    }, this);
                    timer.start();
                }
            }
            self.setImage(self.imgPick4, gifts[3]);
            self.setImage(self.imgPick5, gifts[4]);
            self.setImage(self.imgPick6, gifts[5]);
            self.setImage(self.imgPick7, gifts[6]);
            self.gifts = gifts;
        });
    };
    p.setImage = function (imgPic, gift) {
        if (gift.locked == 1) {
            if (gift.category == 5) {
                imgPic.source = "share_png";
            }
            else if (gift.category == 7) {
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
