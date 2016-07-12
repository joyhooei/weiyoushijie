var BuyToolUI = (function (_super) {
    __extends(BuyToolUI, _super);
    function BuyToolUI(name, price) {
        _super.call(this);
        this._name = name;
        this._price = price;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/buyToolUISkin.exml";
        this.lblGold.touchEnabled = false;
        this.lblPrice.touchEnabled = false;
    }
    var d = __define,c=BuyToolUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
            ;
        }, this);
        this.imgBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.buy();
        }, this);
        this.lblGold.text = "";
        if (this._name == "time") {
            this.imgIcon.source = "timeh_png";
            this.lblGold.text = application.format(application.customer.output * 3600 * 48);
        }
        else if (this._name == "hit") {
            this.imgIcon.source = "hith_png";
        }
        else if (this._name == "ticket") {
            this.imgIcon.source = "ticketh_png";
        }
        else if (this._name == "vip") {
            this.imgIcon.source = "VIPh_png";
        }
        if (this._name == "time" || this._name == "hit") {
            if (application.customer.diamond < this._price) {
                this.imgBuy.source = "buttondiano_png";
            }
            else {
                this.imgBuy.source = "buttondia_png";
            }
            this.lblPrice.text = this._price.toString();
        }
        else {
            this.imgBuy.source = "topupbutton_png";
            this.lblPrice.text = "";
        }
    };
    p.buy = function () {
        if (this._name == "time") {
            this.buyTime();
        }
        else if (this._name == "hit") {
            this.buyHit();
        }
        else if (this._name == "ticket") {
            this.buyTicket();
        }
        else if (this._name == "vip") {
            this.buyVIP();
        }
    };
    p.buyTime = function () {
        if (application.customer.diamond > this._price) {
            application.customer.diamond -= this._price;
            application.earnGold(application.customer.output * 3600 * 48);
            application.saveCustomerNow();
            application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_DEC, "购买了时光沙漏", this._price);
            Toast.launch("购买了时光沙漏");
            application.hideUI(this);
        }
        else {
            application.showUI(new ChargeTipUI());
        }
    };
    p.buyHit = function () {
        if (application.customer.total_hits == 0) {
            if (application.customer.diamond > this._price) {
                application.customer.diamond -= this._price;
                application.customer.total_hits = 3;
                application.saveCustomerNow();
                application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_DEC, "购买了暴击", this._price);
                Toast.launch("购买了暴击");
                application.hideUI(this);
            }
            else {
                application.showUI(new ChargeTipUI());
            }
        }
        else {
            Toast.launch("你还有" + application.customer.total_hits + "个暴击，请用完后再购买");
        }
    };
    //月票，19元每月(30天）。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。普通情况下离线收益为70%，持续8小时。首次购买获得1个勋章
    p.buyTicket = function () {
        if (application.customer.vip == 2) {
            Toast.launch("你已经购买了VIP，终身免费，不需要购买月票");
        }
        else {
            application.buyTicket();
            application.hideUI(this);
        }
    };
    //终身VIP，49元。每天登录可以领取300钻石，离线收益增加至90%，持续12小时。
    p.buyVIP = function () {
        if (application.customer.vip == 2) {
            Toast.launch("你已经购买了VIP，终身免费");
        }
        else {
            application.buyVIP();
            application.hideUI(this);
        }
    };
    return BuyToolUI;
}(eui.Component));
egret.registerClass(BuyToolUI,'BuyToolUI');
