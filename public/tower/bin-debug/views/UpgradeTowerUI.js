var UpgradeTowerUI = (function (_super) {
    __extends(UpgradeTowerUI, _super);
    function UpgradeTowerUI(base) {
        var _this = this;
        _super.call(this, "upgradeTowerUISkin");
        this._base = base;
        this._tower = base.getTower();
        var options = { guardX: this._base.getGuardX(), guardY: this._base.getGuardY() };
        var claz = this._tower.getClaz();
        var idx = parseInt(claz.charAt(claz.length - 1));
        if (idx == 1 || idx == 2) {
            this._nextLevelTower1 = application.pool.get(claz.slice(0, claz.length - 1) + (idx + 1).toString(), options);
            this._nextLevelTower2 = null;
        }
        else if (idx == 3) {
            this._nextLevelTower1 = application.pool.get(claz.slice(0, claz.length - 1) + "4", options);
            if (this._tower.getSuperClaz() == "ArrowTower") {
                this._nextLevelTower2 = application.pool.get(claz.slice(0, claz.length - 1) + "5", options);
            }
            else {
                this._nextLevelTower2 = null;
            }
        }
        else {
            this._nextLevelTower1 = null;
            this._nextLevelTower2 = null;
        }
        application.dao.addEventListener("Battle", function (evt) {
            this.refresh();
        }, this);
        this.imgFlag.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._tower.showFlag();
            application.hideUI(_this);
        }, this);
        this.imgSell.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._base.setTower(null);
            application.hideUI(_this);
        }, this);
        this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._upgradeTo(_this._nextLevelTower1);
        }, this);
        this.imgUpgrade1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._upgradeTo(_this._nextLevelTower1);
        }, this);
        this.imgUpgrade2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._upgradeTo(_this._nextLevelTower2);
        }, this);
    }
    var d = __define,c=UpgradeTowerUI,p=c.prototype;
    p._upgradeTo = function (tower) {
        if (tower) {
            if (application.battle.getGolds() >= tower.getPrice()) {
                this._base.setTower(tower);
                application.hideUI(this);
            }
            else {
                Toast.launch("需要更多的金币");
            }
        }
        else {
            Toast.launch("已经是最高级了");
        }
    };
    p.onRefresh = function () {
        if (this._tower.getSuperClaz() == "SoldierTower") {
            this.imgFlag.visible = true;
        }
        else {
            this.imgFlag.visible = false;
        }
        this.imgBg.source = "towerselect2_png";
        if (this._nextLevelTower1) {
            if (this._nextLevelTower2) {
                this.lblUpgradePrice1.text = this._nextLevelTower1.getPrice().toString();
                this.lblUpgradePrice2.text = this._nextLevelTower2.getPrice().toString();
                this.lblUpgradePrice1.visible = true;
                this.lblUpgradePrice2.visible = true;
                this.imgUpgrade1.visible = true;
                this.imgUpgrade2.visible = true;
                this.lblUpgradePrice.visible = false;
                this.imgUpgrade.visible = false;
            }
            else {
                this.lblUpgradePrice.text = this._nextLevelTower1.getPrice().toString();
                this.lblUpgradePrice1.visible = false;
                this.lblUpgradePrice2.visible = false;
                this.imgUpgrade1.visible = false;
                this.imgUpgrade2.visible = false;
                this.lblUpgradePrice.visible = true;
                this.imgUpgrade.visible = true;
            }
        }
        else {
            this.lblUpgradePrice1.visible = false;
            this.lblUpgradePrice2.visible = false;
            this.imgUpgrade1.visible = false;
            this.imgUpgrade2.visible = false;
            this.lblUpgradePrice.visible = false;
            this.imgUpgrade.visible = false;
        }
        this.lblSellPrice.text = this._tower.getSellPrice().toString();
    };
    return UpgradeTowerUI;
}(AbstractUI));
egret.registerClass(UpgradeTowerUI,'UpgradeTowerUI');
//# sourceMappingURL=UpgradeTowerUI.js.map