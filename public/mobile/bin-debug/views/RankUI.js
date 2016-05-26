var RankUI = (function (_super) {
    __extends(RankUI, _super);
    function RankUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/rankUISkin.exml";
    }
    var d = __define,c=RankUI,p=c.prototype;
    p.uiCompHandler = function () {
        var self = this;
        application.dao.fetch("Customer", {}, { limit: 8, order: 'metal DESC' }, function (succeed, customers) {
            if (succeed) {
                for (var i = 0; i < customers.length; i++) {
                    self.addCustomer(false, i + 1, customers[i]);
                }
            }
        });
        application.dao.rest("rank", { customer_id: application.customer.id }, function (succeed, ranks) {
            if (succeed) {
                for (var i = 0; i < ranks.length; i++) {
                    if (ranks[i].customer) {
                        self.addCustomer(true, ranks[i].rank, ranks[i].customer);
                    }
                }
            }
        });
    };
    p.addCustomer = function (showMe, rank, customer) {
        var item = new RankItem(showMe, rank, customer);
        if (showMe) {
            this.listMyRank.addChild(item);
        }
        else {
            this.listRank.addChild(item);
        }
    };
    p.back = function () {
        this.dispatchEventWith(GameEvents.EVT_RETURN);
    };
    return RankUI;
}(eui.Component));
egret.registerClass(RankUI,'RankUI');
