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
        var max = 20;
        application.dao.fetch("Customer", {}, { limit: max + 2, order: 'metal DESC, accumulated_gold DESC' }).then(function (customers) {
            var rank = 0;
            var last = null;
            var me = null;
            var next = null;
            self.listRank.removeChildren();
            for (var i = 0; i < Math.min(max + 1, customers.length); i++) {
                if (i < max) {
                    var item = new RankItem(false, i + 1, customers[i]);
                    self.listRank.addChild(item);
                }
                if (application.me.attrs.id == customers[i].id) {
                    me = application.me.attrs;
                    rank = i + 1;
                    //如果我是第一名就没有last
                    if (i > 0) {
                        last = customers[i - 1];
                    }
                    //下一名肯定是有的，因为多取了2条记录
                    next = customers[i + 1];
                }
            }
            if (me) {
                self.listMyRank.removeChildren();
                if (last) {
                    self.listMyRank.addChild(new RankItem(true, rank - 1, last));
                }
                self.listMyRank.addChild(new RankItem(true, rank, me));
                self.listMyRank.addChild(new RankItem(true, rank + 1, next));
            }
            else {
                application.dao.fetch("Rank", { customer_id: application.me.attrs.id }, { limit: 1 }).then(function (myRanks) {
                    if (myRanks.length == 1) {
                        application.dao.fetch("Rank", { rank: [myRanks[0].rank - 1, myRanks[0].rank, myRanks[0].rank + 1] }, { order: 'rank ASC' }).then(function (ranks) {
                            if (ranks.length > 0) {
                                var ids = [];
                                for (var i = 0; i < ranks.length; i++) {
                                    ids.push(ranks[i].customer_id);
                                }
                                application.dao.fetch("Customer", { id: ids }, { limit: ids.length }).then(function (customers) {
                                    if (customers.length > 0) {
                                        self.listMyRank.removeChildren();
                                        for (var i = 0; i < ranks.length; i++) {
                                            for (var j = 0; j < customers.length; j++) {
                                                if (ranks[i].customer_id == customers[j].id) {
                                                    var item = new RankItem(true, ranks[i].rank, customers[j]);
                                                    self.listMyRank.addChild(item);
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
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
