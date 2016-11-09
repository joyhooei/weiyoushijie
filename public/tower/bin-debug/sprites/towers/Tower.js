var Tower = (function (_super) {
    __extends(Tower, _super);
    function Tower() {
        _super.call(this);
        this._displays.addClip("tower_building", "building");
        this._criticalClip = EntityDisplays.loadClip("critical");
        this.touchEnabled = true;
    }
    var d = __define,c=Tower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._buildingTicks = this._get(properties, "buildingTicks", application.frameRate);
        this._price = this._get(properties, "price", 100);
        this._upgradePrice = this._get(properties, "upgradePrice", 100);
        this._guardX = this._get(properties, "guardX", 10);
        this._guardY = this._get(properties, "guardY", 10);
        this._guardRadius = this._get(properties, "guardRadius", 10);
        var force = this._get(properties, "force", 10);
        this._forceHigh = this._get(properties, "forceHigh", force);
        this._forceLow = this._get(properties, "forceLow", force);
        this._critical = this._get(properties, "critical", 0);
        this._range = null;
        this._base = null;
        this._skill = Skill.get(application.skills, this.getSuperClaz(), 0);
    };
    p.setBase = function (base) {
        this._base = base;
    };
    p.getGuardRadius = function () {
        return this._guardRadius;
    };
    p.getPrice = function () {
        return this._price;
    };
    p.getSellPrice = function () {
        return Math.round(this._price / 2);
    };
    //是否可以升级
    p.upgradable = function () {
        return true;
    };
    p.getUpgradePrice = function () {
        return this._upgradePrice;
    };
    p.totalSkills = function () {
        return 2;
    };
    //是否可以升级技能
    p.skillUpgradable = function (skill) {
        return false;
    };
    p.getSkillUpgradePrice = function (skill) {
        return 0;
    };
    p.upgradeSkill = function (skill) {
    };
    //对tower使用skill
    p.useSkill = function (tower) {
    };
    p.getSkillLevel = function (skill) {
        return 0;
    };
    p.getForce = function () {
        var force = Entity.random(this._forceLow, this._forceHigh);
        if (this._critical > 0 && Math.random() * 100 <= this._critical) {
            return force << 1;
        }
        else {
            return force;
        }
    };
    p.incCritical = function (critical) {
        if (this._critical == 0) {
            this._critical = Math.max(0, this._critical + critical);
            if (this._critical > 0) {
                this._criticalClip.x = (this._criticalClip.width >> 1) + ((this.width - this._criticalClip.width) / 2);
                this._criticalClip.y = (this._criticalClip.height >> 1) + (this.height - this._criticalClip.height);
                this.addChild(this._criticalClip);
                this._criticalClip.gotoAndPlay(0, -1);
            }
        }
        else {
            this._critical = Math.max(0, this._critical + critical);
            if (this._critical == 0) {
                this._criticalClip.stop();
                this.removeChild(this._criticalClip);
            }
        }
    };
    p._idle = function () {
        this.build();
        if (this._range) {
            this._range.erase();
            this._range = null;
        }
        application.battle.incGolds(-this.getPrice());
    };
    p._building = function () {
        this._ticks++;
        if (this._ticks > this._buildingTicks) {
            this.guard();
            var towers = this.findNeighbors();
            for (var i = 0; i < towers.length; i++) {
                towers[i].useSkill(this);
            }
        }
    };
    p.findNeighbors = function () {
        return application.battle.findTowers(this.getCenterX(), this.getCenterY(), 100);
    };
    p.select = function (again) {
        if (again) {
            this.deselect();
            return false;
        }
        else {
            application.showUI(new TowerMenuUI(this._base), application.battle.getUI(), this.getCenterX(), this.getCenterY());
            return true;
        }
    };
    p.deselect = function () {
        if (this._range) {
            this._range.erase();
            this._range = null;
        }
    };
    return Tower;
}(Entity));
egret.registerClass(Tower,'Tower',["Selectable"]);
//# sourceMappingURL=Tower.js.map