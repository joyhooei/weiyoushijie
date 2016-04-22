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
        application.dao.fetch("Customer", {}, { limit: 8, order: ' DESC' }, function (succeed, customers) {
            var dsCustomers = new Array();
            if (succeed) {
                for (var i = 0; i < customers.length; i++) {
                    dsCustomers.push({ icon: customers[i].avatar, name: customers[i].name, metal: customers[i].metal });
                }
            }
            self.listRank.dataProvider = new eui.ArrayCollection(dsCustomers);
            self.listRank.itemRenderer = RankIRSkin;
        });
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
