var UpgradeTowerUI = (function (_super) {
    __extends(UpgradeTowerUI, _super);
    function UpgradeTowerUI(base) {
        var _this = this;
        _super.call(this, "upgradeTowerUISkin");
        this._base = base;
        this._tower = base.getTower();
        var claz = this._tower.getClaz();
        var idx = parseInt(claz.charAt(claz.length - 1));
        if (idx == 1 || idx == 2) {
            this._nextLevelTower1 = application.pool.get(claz.slice(0, claz.length - 1) + (idx + 1).toString());
            this._nextLevelTower2 = null;
        }
        else if (idx == 3) {
            this._nextLevelTower1 = application.pool.get(claz.slice(0, claz.length - 1) + "4");
            this._nextLevelTower2 = application.pool.get(claz.slice(0, claz.length - 1) + "5");
        }
        else {
            this._nextLevelTower1 = null;
            this._nextLevelTower2 = null;
        }
        application.dao.addEventListener("Battle", function (evt) {
            this.refresh();
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (_this.imgFlag.visible) {
                var x = Math.round(e.localX) + _this.x;
                var y = Math.round(e.localY) + _this.y;
                _this.imgFlag.x = x - _this.imgFlag.height - _this.x;
                _this.imgFlag.y = y - _this.imgFlag.width / 2 - _this.y;
                var soldierTower = _this._tower;
                if (x != soldierTower.getGuardX() || y != soldierTower.getGuardY()) {
                    soldierTower.guardAt(x, y);
                    if (_this._nextLevelTower1) {
                        _this._nextLevelTower1.guardAt(x, y);
                    }
                    if (_this._nextLevelTower2) {
                        _this._nextLevelTower2.guardAt(x, y);
                    }
                }
            }
            else {
                application.hideUI(_this);
            }
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
            if (application.battle.getGolds() > tower.getPrice()) {
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
            var soldierTower = this._tower;
            this.imgFlag.x = soldierTower.getGuardX() - this.imgFlag.height - this.x;
            this.imgFlag.y = soldierTower.getGuardY() - this.imgFlag.width / 2 - this.y;
            if (this._nextLevelTower1) {
                this._nextLevelTower1.guardAt(soldierTower.getGuardX(), soldierTower.getGuardY());
            }
            if (this._nextLevelTower2) {
                this._nextLevelTower2.guardAt(soldierTower.getGuardX(), soldierTower.getGuardY());
            }
        }
        else {
            this.imgFlag.visible = false;
        }
        if (this._nextLevelTower1) {
            if (this._nextLevelTower2) {
                this.imgBg.source = "towerselect3_png";
                this.lblUpgradePrice1.text = this._tower.getUpgradePrice().toString();
                this.lblUpgradePrice2.text = this._tower.getUpgradePrice().toString();
                this.lblUpgradePrice1.visible = true;
                this.lblUpgradePrice2.visible = true;
                this.imgUpgrade1.visible = true;
                this.imgUpgrade2.visible = true;
                this.lblUpgradePrice.visible = false;
                this.imgUpgrade.visible = false;
            }
            else {
                this.imgBg.source = "towerselect2_png";
                this.lblUpgradePrice.text = this._tower.getUpgradePrice().toString();
                this.lblUpgradePrice1.visible = false;
                this.lblUpgradePrice2.visible = false;
                this.imgUpgrade1.visible = false;
                this.imgUpgrade2.visible = false;
                this.lblUpgradePrice.visible = true;
                this.imgUpgrade.visible = true;
            }
        }
        else {
            this.imgBg.source = "towerselect2_png";
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