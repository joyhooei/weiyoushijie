var TowerMenuUI = (function (_super) {
    __extends(TowerMenuUI, _super);
    function TowerMenuUI(tower) {
        var _this = this;
        _super.call(this, "towerMenuUISkin");
        this._tower = tower;
        application.dao.addEventListener("Battle", function (evt) {
            this.refresh();
        }, this);
        this.imgSell.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var price = parseInt(_this.lblSellPrice.text);
            application.battle.incGolds(price);
            application.battle.hideAllTools();
        }, this);
    }
    var d = __define,c=TowerMenuUI,p=c.prototype;
    p._onRefresh = function () {
    };
    return TowerMenuUI;
}(AbstractUI));
egret.registerClass(TowerMenuUI,'TowerMenuUI');
//# sourceMappingURL=TowerMenuUI.js.map