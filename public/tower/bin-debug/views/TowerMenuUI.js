var TowerMenuUI = (function (_super) {
    __extends(TowerMenuUI, _super);
    function TowerMenuUI(base) {
        var _this = this;
        _super.call(this, "towerMenuUISkin");
        this._base = base;
        this._tower = this._base.getTower();
        this.imgFlag.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._tower.showFlag();
            _this.hide();
        }, this);
    }
    var d = __define,c=TowerMenuUI,p=c.prototype;
    p.onRefresh = function () {
        var properties = { guardX: this._base.getGuardX(), guardY: this._base.getGuardY() };
        if (!this._tower) {
            //新建塔
            this.imgFlag.visible = false;
            this._render((this.width >> 1) - 40, 0, "soldiertower1_png", "SoldierTower1", properties);
            this._render((this.width >> 1) - 40, 120, "magictower1_png", "MagicTower1", properties);
            this._render(0, (this.height >> 1) - 35, "arrowtower1_png", "ArrowTower1", properties);
            this._render(120, (this.height >> 1) - 35, "bombtower1_png", "BombTower1", properties);
        }
        else {
            this.imgFlag.visible = this._tower.getSuperClaz() == "SoldierTower";
            TowerItem.createSellItem(this, (this.width >> 1) - 40, 120, this._base);
            if (this._tower.upgradable()) {
                //升级塔
                var claz = this._tower.getClaz();
                var idx = parseInt(claz.charAt(claz.length - 1)) + 1;
                var path = "";
                switch (this._tower.getSuperClaz()) {
                    case "MagicTower":
                        path = "magictower" + idx + "_png";
                        break;
                    case "ArrowTower":
                        path = "arrowtower" + idx + "_png";
                        break;
                    case "BombTower":
                        path = "bombtower" + idx + "_png";
                        break;
                    case "SoldierTower":
                        path = "soldiertower" + idx + "_png";
                        break;
                }
                if (this._tower.getClaz() == "ArrowTower3") {
                    this._render(10, 20, path, claz.slice(0, claz.length - 1) + idx.toString(), properties);
                    this._render(110, 20, "arrowtower5_png", claz.slice(0, claz.length - 1) + (idx + 1).toString(), properties);
                }
                else {
                    this._render((this.width >> 1) - 40, 0, path, claz.slice(0, claz.length - 1) + idx.toString(), properties);
                }
            }
            else {
                //升级技能
                var skill1Path = "";
                var skill2Path = "";
                var skill3Path = "";
                switch (this._tower.getClaz()) {
                    case "MagicTower4":
                        skill1Path = "magictower4_skill1_png";
                        skill2Path = "magictower4_skill2_png";
                        break;
                    case "ArrowTower4":
                        skill1Path = "arrowtower4_skill1_png";
                        skill2Path = "arrowtower4_skill2_png";
                        break;
                    case "ArrowTower5":
                        skill1Path = "arrowtower5_skill1_png";
                        skill2Path = "arrowtower5_skill2_png";
                        break;
                    case "BombTower4":
                        skill1Path = "bombtower4_skill1_png";
                        skill2Path = "bombtower4_skill2_png";
                        break;
                    case "SoldierTower4":
                        skill1Path = "soldiertower4_skill1_png";
                        skill2Path = "soldiertower4_skill2_png";
                        skill3Path = "soldiertower4_skill3_png";
                        break;
                }
                if (this._tower.skillUpgradable(1) && this._tower.skillUpgradable(2) && this._tower.skillUpgradable(3)) {
                    this._renderSkill((this.width >> 1) - 40, 0, skill1Path, 1);
                    this._renderSkill(10, 40, skill2Path, 2);
                    this._renderSkill(110, 40, skill3Path, 3);
                }
                else if (this._tower.skillUpgradable(1) && this._tower.skillUpgradable(2)) {
                    this._renderSkill(10, 20, skill1Path, 1);
                    this._renderSkill(110, 20, skill2Path, 2);
                }
                else if (this._tower.skillUpgradable(1) && this._tower.skillUpgradable(3)) {
                    this._renderSkill(10, 20, skill1Path, 1);
                    this._renderSkill(110, 20, skill3Path, 3);
                }
                else if (this._tower.skillUpgradable(3) && this._tower.skillUpgradable(2)) {
                    this._renderSkill(10, 20, skill2Path, 2);
                    this._renderSkill(110, 20, skill3Path, 3);
                }
                else if (this._tower.skillUpgradable(1)) {
                    this._renderSkill((this.width >> 1) - 40, 0, skill1Path, 1);
                }
                else if (this._tower.skillUpgradable(2)) {
                    this._renderSkill((this.width >> 1) - 40, 0, skill2Path, 2);
                }
                else if (this._tower.skillUpgradable(3)) {
                    this._renderSkill((this.width >> 1) - 40, 0, skill3Path, 3);
                }
            }
        }
    };
    p._renderSkill = function (x, y, res, skill) {
        var _this = this;
        var towerItem = TowerItem.createItem(this, x, y, res, this._tower.getSkillUpgradePrice(skill));
        towerItem.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._upgradeSkill(skill);
        }, this);
    };
    p._render = function (x, y, res, claz, properties) {
        var _this = this;
        var tower = application.pool.get(claz, properties);
        var towerItem = TowerItem.createItem(this, x, y, res, tower.getPrice());
        towerItem.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._build(tower);
        }, this);
    };
    p._build = function (tower) {
        var price = tower.getPrice();
        if (application.battle.getGolds() >= price) {
            application.battle.incGolds(-price);
            this._base.setTower(tower);
            this.hide();
        }
        else {
            Toast.launch("需要更多的金币");
        }
    };
    p._upgradeSkill = function (skill) {
        var price = this._tower.getSkillUpgradePrice(skill);
        if (application.battle.getGolds() >= price) {
            application.battle.incGolds(-price);
            this._tower.upgradeSkill(skill);
            application.battle.unselect(this._tower);
            this.hide();
        }
        else {
            Toast.launch("需要更多的金币");
        }
    };
    return TowerMenuUI;
}(AbstractUI));
egret.registerClass(TowerMenuUI,'TowerMenuUI');
//# sourceMappingURL=TowerMenuUI.js.map