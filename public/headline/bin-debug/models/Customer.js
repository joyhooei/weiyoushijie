var Customer = (function () {
    function Customer(attrs) {
        this.saveSeconds = 0;
        this.attrs = attrs;
        if (!this.attrs.earned_gold) {
            this.attrs.earned_gold = 0;
        }
        this.vip = Vip.create(this.attrs.charge);
        this.bid = new Bid();
        this.checkTicket();
    }
    var d = __define,c=Customer,p=c.prototype;
    p.resetTicket = function (vip) {
        this.attrs.vip = vip;
        if (vip == 0 || vip == 2) {
            this.attrs.ticket = "";
        }
        else {
            var now = new Date();
            now = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30);
            this.attrs.ticket = now.toString();
        }
        this.saveNow();
    };
    //检查是否ticket超期了
    p.checkTicket = function () {
        if (this.attrs.vip == 1) {
            if (this.attrs.ticket && this.attrs.ticket.length > 1) {
                var ticketTimeout = new Date(this.attrs.ticket);
                var now = new Date();
                if (ticketTimeout.getTime() < now.getTime()) {
                    this.resetTicket(0);
                }
            }
            else {
                this.resetTicket(1);
            }
        }
    };
    p.save = function () {
        var now = (new Date()).getTime() / 1000;
        if (now - this.saveSeconds >= 120) {
            this.saveNow();
        }
        else {
            application.dao.dispatchEventWith("Customer", true, this.attrs);
        }
    };
    p.saveNow = function () {
        var self = this;
        self.saveSeconds = (new Date()).getTime() / 1000;
        var oldCharge = self.attrs.charge;
        self.attrs.version = application.version;
        self.attrs.gold = Math.max(0, self.attrs.gold);
        self.attrs.earned_gold = Math.max(0, self.attrs.earned_gold);
        self.attrs.accumulated_gold = Math.max(self.attrs.accumulated_gold, self.attrs.gold);
        self.attrs.diamond = Math.max(0, self.attrs.diamond);
        self.attrs.metal = +(new Number(self.attrs.metal).toFixed(3));
        application.dao.save("Customer", self.attrs).then(function (customer) {
            if (customer.charge != oldCharge) {
                self.vip = Vip.create(customer.charge);
            }
        });
    };
    p.earnOfflineGold = function () {
        if (this.attrs.offline_gold > 0) {
            this.earnGold(this.attrs.offline_gold);
            this.saveNow();
        }
    };
    p.earnGold = function (gold) {
        //处理大数 + 小数，小数被四舍五入的问题
        this.attrs.earned_gold += gold;
        var oldGold = this.attrs.gold;
        this.attrs.gold += this.attrs.earned_gold;
        if (oldGold != this.attrs.gold) {
            this.attrs.accumulated_gold += this.attrs.earned_gold;
            this.attrs.earned_gold = 0;
        }
        this.save();
    };
    p.useGold = function (gold) {
        if (this.attrs.earned_gold > gold) {
            this.attrs.earned_gold -= gold;
        }
        else {
            this.attrs.gold = this.attrs.gold + this.attrs.earned_gold - gold;
            this.attrs.earned_gold = 0;
        }
        this.saveNow();
    };
    p.usableGold = function () {
        if (this.bid.attrs) {
            return Math.max(0, this.attrs.gold + this.attrs.earned_gold - this.bid.attrs.gold);
        }
        else {
            return Math.max(0, this.attrs.gold + this.attrs.earned_gold);
        }
    };
    p.buyOutput = function (gold, diamond, output) {
        gold = Math.abs(gold);
        diamond = Math.abs(diamond);
        output = Math.abs(output);
        this.attrs.diamond -= diamond;
        this.attrs.output += output;
        this.useGold(gold);
        if (this.attrs.output >= 100) {
            if (Utility.log10(this.attrs.output) > Utility.log10(this.attrs.output - output)) {
                application.dao.fetch("Gift", { customer_id: this.attrs.id, category: 7 }, { limit: 1 }).then(function (gifts) {
                    if (gifts.length > 0) {
                        var gift = gifts[0];
                        gift.locked = 0;
                        application.dao.save("Gift", gift);
                    }
                });
            }
        }
    };
    Customer.avatarUrl = function (customer) {
        if (customer.avatar && customer.avatar.length > 1) {
            return decodeURIComponent(customer.avatar);
        }
        else {
            var url = application.baseUrl + "headline/resource/art/";
            if (customer.sex == 1) {
                return url + "headM.png";
            }
            else if (customer.sex == 2) {
                return url + "headF.png";
            }
            else {
                return url + "head.png";
            }
        }
    };
    return Customer;
}());
egret.registerClass(Customer,'Customer');
