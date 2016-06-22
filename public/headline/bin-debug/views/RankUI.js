var RankUI = (function (_super) {
    __extends(RankUI, _super);
    function RankUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/rankUISkin.exml";
    }
    var d = __define,c=RankUI,p=c.prototype;
    p.refresh = function () {
        var self = this;
        self.dataReady = 0;
        application.dao.rest("rank", { customer_id: application.customer.id }, function (succeed, ranks) {
            if (succeed) {
                self.ranks = ranks;
                self.listMyRank.removeChildren();
                for (var i = 0; i < self.ranks.length; i++) {
                    if (self.ranks[i].customer) {
                        var item = new RankItem(true, self.ranks[i].rank, self.ranks[i].customer);
                        this.listMyRank.addChild(item);
                    }
                }
            }
        });
        application.dao.fetch("Customer", {}, { limit: 10, order: 'metal DESC, accumulated_gold DESC' }, function (succeed, customers) {
            if (succeed) {
                self.customers = customers;
                self.listRank.removeChildren();
                for (var i = 0; i < self.customers.length; i++) {
                    var item = new RankItem(false, i + 1, self.customers[i]);
                    self.listRank.addChild(item);
                }
            }
        });
    };
    p.uiCompHandler = function () {
        this.refresh();
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.gotoHome();
        }, this);
    };
    p.back = function () {
        this.dispatchEventWith(GameEvents.EVT_RETURN);
    };
    return RankUI;
}(eui.Component));
egret.registerClass(RankUI,'RankUI');
