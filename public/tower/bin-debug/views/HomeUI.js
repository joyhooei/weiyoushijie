var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        _super.call(this, "homeUISkin");
        this.gold = 0;
        this.diamond = 0;
        this.output = 0;
    }
    var d = __define,c=HomeUI,p=c.prototype;
    p.onRefresh = function () {
        var self = this;
        self.lblAddGold.visible = false;
        self.imgAddGold.visible = false;
        self.lblAddGold.backgroundColor = 0xFFFFFF;
        self.imgGift.visible = false;
        self.imgReward.visible = false;
        self.imgHasMessage.visible = false;
        self.imgVip.source = "VIP" + application.me.vip.getLevel().toString() + "_png";
        self.imgAvatar.source = Customer.avatarUrl(application.me.attrs);
        self.renderCustomer();
        self.btnGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new GiftUI(), this);
        }, this);
        self.btnReward.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new LoginRewardUI(), this);
        }, this);
        self.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            HelpUI.showMainHelp();
        }, this);
        self.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new BuyToolUI("time", 500));
        }, this);
        self.btnAddDiamond.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new ChargeTipUI(), this);
        }, this);
        self.imgCharge.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            if (application.me.attrs.charge == 0) {
                application.showUI(new FirstChargeBonusUI(), this);
            }
            else {
                application.showUI(new ChargeTipUI(), this);
            }
        }, this);
        self.imgMessage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new MessageUI(), this);
        }, this);
        self.imgVip.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            application.showUI(new VipUI(), this);
        }, this);
        application.dao.addEventListener("Customer", function (ev) {
            this.renderCustomer();
        }, this);
        application.dao.addEventListener("Gift", function (ev) {
            this.renderGift();
        }, this);
        application.dao.addEventListener("Audit", function (ev) {
            this.renderReward();
        }, this);
        application.dao.addEventListener("Message", function (ev) {
            this.renderMessage();
        }, this);
        self.renderGiftDynamically();
        self.renderReward();
        if (application.guideUI) {
            application.guideUI.setOverCallback(function () {
                self.earnGoldDynamically();
                self.refreshMessageTimely();
            });
            this.addChild(application.guideUI);
            application.guideUI.next();
        }
        else {
            self.earnGoldDynamically();
            self.refreshMessageTimely();
        }
    };
    p.renderGiftDynamically = function () {
        this.renderGift();
        application.stopwatch.addEventListener("hour", function (event) {
            this.renderGift();
        }, this);
    };
    p.renderGift = function () {
        var self = this;
        Gift.check(application.me).then(function (gifts) {
            self.imgGift.visible = Gift.hasGift(gifts);
        });
    };
    p.renderReward = function () {
        var self = this;
        Audit.check(application.me).then(function (audits) {
            self.imgReward.visible = Audit.hasRewards(audits);
        });
    };
    p.earnGoldDynamically = function () {
        var seconds = 5;
        application.stopwatch.addEventListener("second", function (event) {
            if (event.data % seconds == 0) {
                this.earnGold(seconds);
            }
        }, this);
    };
    p.refreshMessageTimely = function () {
        this.renderMessage();
        application.stopwatch.addEventListener("hour", function (event) {
            this.renderMessage();
        }, this);
    };
    p.renderMessage = function () {
        var self = this;
        self.imgHasMessage.visible = false;
        application.dao.fetch("Message", { customer_id: application.me.attrs.id, state: 0 }, { limit: 1 }).then(function (messages) {
            if (messages.length == 1) {
                self.imgHasMessage.visible = true;
            }
        });
    };
    p.renderOfflineGold = function () {
        if (application.me.attrs.offline_gold > 0) {
            application.showUI(new OfflineGoldUI(), this);
        }
    };
    p.earnGold = function (second) {
        var gold = this.getOutput() * second;
        application.me.earnGold(gold);
        //显示获得金币的动画
        this.grpAddGold.y = 370;
        this.imgAddGold.visible = true;
        this.lblAddGold.visible = true;
        this.lblAddGold.text = "+" + Utility.format(gold);
        var timer = new egret.Timer(100, 20);
        timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            this.grpAddGold.y -= 10;
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (event) {
            this.lblAddGold.visible = false;
            this.imgAddGold.visible = false;
        }, this);
        timer.start();
    };
    p.getOutput = function () {
        return application.me.attrs.output;
    };
    p.animateStep = function (lbl, from, to) {
        if (from == to) {
            return;
        }
        var step = Math.min(Math.abs(from - to), 20);
        var delta = (to - from) / step;
        var timer = new egret.Timer(50, step);
        timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            lbl.text = Utility.format(Math.round(from + delta * event.target.currentCount));
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (event) {
            lbl.text = Utility.format(to);
        }, this);
        timer.start();
    };
    p.renderCustomer = function () {
        if (this.gold != application.me.usableGold()) {
            this.animateStep(this.lblGold, this.gold, application.me.usableGold());
            this.gold = application.me.usableGold();
        }
        if (this.diamond != application.me.attrs.diamond) {
            this.animateStep(this.lblDiamond, this.diamond, application.me.attrs.diamond);
            this.diamond = application.me.attrs.diamond;
        }
        if (this.output != this.getOutput()) {
            this.animateStep(this.lblOutput, this.output, this.getOutput());
            this.output = this.getOutput();
        }
        if (application.me.attrs.charge > 0) {
            this.imgCharge.source = "charge_png";
        }
        this.lblName.text = application.me.attrs.name;
    };
    return HomeUI;
}(AbstractUI));
egret.registerClass(HomeUI,'HomeUI');
