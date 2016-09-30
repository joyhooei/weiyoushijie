var TowerMenuUI = (function (_super) {
    __extends(TowerMenuUI, _super);
    function TowerMenuUI(base) {
        var _this = this;
        _super.call(this, "towerMenuUISkin");
        this._base = base;
        var claz = this._base.getTower().getNextLevelTowerClaz();
        if (claz) {
            this._nextLevelTower = application.pool.get(claz);
        }
        else {
            this._nextLevelTower = null;
        }
        application.dao.addEventListener("Battle", function (evt) {
            this.refresh();
        }, this);
        this.imgSell.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._base.setTower(null);
            application.hideUI(_this);
        }, this);
        this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this._nextLevelTower) {
                if (application.battle.getGolds() > _this._nextLevelTower.getPrice()) {
                    _this._base.setTower(_this._nextLevelTower);
                    application.hideUI(_this);
                }
                else {
                    Toast.launch("需要更多的金币");
                }
            }
            else {
                Toast.launch("已经是最高级了");
            }
        }, this);
    }
    var d = __define,c=TowerMenuUI,p=c.prototype;
    p._onRefresh = function () {
        if (this._nextLevelTower) {
            this.lblUpgraePrice.text = this._nextLevelTower.getPrice().toString();
        }
        else {
            this.lblUpgraePrice.text = "";
        }
        this.lblUpgraePrice.text = this._base.getTower().getSellPrice().toString();
    };
    return TowerMenuUI;
}(AbstractUI));
egret.registerClass(TowerMenuUI,'TowerMenuUI');
//# sourceMappingURL=TowerMenuUI.js.map