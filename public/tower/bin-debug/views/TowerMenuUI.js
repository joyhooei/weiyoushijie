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
                var superClaz = claz.slice(0, claz.length - 1);
                var path = this._getIconPath(claz, 1);
                if (this._tower.getClaz() == "ArrowTower3") {
                    this._render(10, 20, path, superClaz + idx.toString(), properties);
                    this._render(110, 20, "arrowtower5_png", superClaz + (idx + 1).toString(), properties);
                }
                else {
                    this._render((this.width >> 1) - 40, 0, path, superClaz + idx.toString(), properties);
                }
            }
            else {
                //升级技能
                var skill1Path = this._getSkillIconPath(this._tower, 1);
                var skill2Path = this._getSkillIconPath(this._tower, 2);
                var skill3Path = this._getSkillIconPath(this._tower, 3);
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
        var self = this;
        self.show(new OptionUI(self._getIconPath(self._tower.getClaz(), 0), self._getDescription(self._tower), function () {
            var price = tower.getPrice();
            if (application.battle.getGolds() >= price) {
                application.battle.incGolds(-price);
                self._base.setTower(tower);
                self.hide();
            }
            else {
                Toast.launch("需要更多的金币");
            }
        }));
    };
    p._upgradeSkill = function (skill) {
        var self = this;
        self.show(new OptionUI(self._getSkillIconPath(self._tower, skill), self._getSkillDescription(self._tower, skill), function () {
            var price = self._tower.getSkillUpgradePrice(skill);
            if (application.battle.getGolds() >= price) {
                application.battle.incGolds(-price);
                self._tower.upgradeSkill(skill);
                application.battle.unselect(self._tower);
                self.hide();
            }
            else {
                Toast.launch("需要更多的金币");
            }
        }));
    };
    p._getIconPath = function (claz, levelDelta) {
        if (levelDelta === void 0) { levelDelta = 1; }
        var idx = parseInt(claz.charAt(claz.length - 1)) + levelDelta;
        var superClaz = claz.slice(0, claz.length - 1);
        switch (superClaz) {
            case "MagicTower":
                return "magictower" + idx + "_png";
            case "ArrowTower":
                return "arrowtower" + idx + "_png";
            case "BombTower":
                return "bombtower" + idx + "_png";
            case "SoldierTower":
                return "soldiertower" + idx + "_png";
        }
    };
    p._getDescription = function (tower) {
        return "";
    };
    p._getSkillIconPath = function (tower, skill) {
        switch (tower.getClaz()) {
            case "MagicTower4":
                if (skill == 1) {
                    return "magictower4_skill1_png";
                }
                else if (skill == 2) {
                    return "magictower4_skill2_png";
                }
                else {
                    return null;
                }
            case "ArrowTower4":
                if (skill == 1) {
                    return "arrowtower4_skill1_png";
                }
                else if (skill == 2) {
                    return "arrowtower4_skill2_png";
                }
                else {
                    return null;
                }
            case "ArrowTower5":
                if (skill == 1) {
                    return "arrowtower5_skill1_png";
                }
                else if (skill == 2) {
                    return "arrowtower5_skill2_png";
                }
                else {
                    return null;
                }
            case "BombTower4":
                if (skill == 1) {
                    return "bombtower4_skill1_png";
                }
                else if (skill == 2) {
                    return "bombtower4_skill2_png";
                }
                else {
                    return null;
                }
            case "SoldierTower4":
                if (skill == 1) {
                    return "soldiertower4_skill1_png";
                }
                else if (skill == 2) {
                    return "soldiertower4_skill2_png";
                }
                else {
                    return "soldiertower4_skill3_png";
                }
        }
    };
    p._getSkillDescription = function (tower, skill) {
        return "";
    };
    return TowerMenuUI;
}(AbstractUI));
egret.registerClass(TowerMenuUI,'TowerMenuUI');
//# sourceMappingURL=TowerMenuUI.js.map