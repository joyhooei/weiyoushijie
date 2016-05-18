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
            var dsCustomers = new Array();
            if (succeed) {
                for (var i = 0; i < customers.length; i++) {
                    if (i == 0) {
                        var bg = "RR_png";
                    }
                    else if (i == 1) {
                        var bg = "RBlue_png";
                    }
                    else if (i == 2) {
                        var bg = "RB_png";
                    }
                    else {
                        var bg = "RG_png";
                    }
                    var c = customers[i];
                    dsCustomers.push({ bg: bg, icon: c.avatar, name: c.name, metal: c.metal, gold: application.format(c.gold) });
                }
            }
            self.listRank.dataProvider = new eui.ArrayCollection(dsCustomers);
            self.listRank.itemRenderer = RankIRSkin;
        });
    };
    p.back = function () {
        this.dispatchEventWith(GameEvents.EVT_RETURN);
    };
    return RankUI;
}(eui.Component));
egret.registerClass(RankUI,'RankUI');
var RankIRSkin = (function (_super) {
    __extends(RankIRSkin, _super);
    function RankIRSkin() {
        _super.call(this);
        this.skinName = "rankIRSkin";
    }
    var d = __define,c=RankIRSkin,p=c.prototype;
    return RankIRSkin;
}(eui.ItemRenderer));
egret.registerClass(RankIRSkin,'RankIRSkin');
