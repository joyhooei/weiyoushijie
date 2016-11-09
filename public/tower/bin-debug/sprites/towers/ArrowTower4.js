var ArrowTower4 = (function (_super) {
    __extends(ArrowTower4, _super);
    function ArrowTower4() {
        _super.call(this);
        this.addBitmap("arrowtower4_png");
        this._bulletClaz = "Arrow5";
    }
    var d = __define,c=ArrowTower4,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._skill1Level = 0;
        this._skill1Ticks = 0;
        this._skill2Level = 0;
    };
    p.upgradeSkill = function (skill) {
        if (skill == 1) {
            this._skill1Level++;
        }
        else if (skill == 2) {
            this._skill2Level++;
            var towers = this.findNeighbors();
            for (var i = 0; i < towers.length; i++) {
                towers[i].incCritical(this._getCritical(this._skill2Level) - this._getCritical(this._skill2Level - 1));
            }
        }
    };
    p.useSkill = function (tower) {
        if (this._skill2Level > 0) {
            tower.incCritical(this._getCritical(this._skill2Level));
        }
    };
    p.skillUpgradable = function (skill) {
        if (skill == 1) {
            return this._skill1Level < 3;
        }
        else if (skill == 2) {
            return this._skill2Level < 3;
        }
        else {
            return false;
        }
    };
    p.upgradable = function () {
        return false;
    };
    p.getSkillUpgradePrice = function (skill) {
        if (skill == 1) {
            if (this._skill1Level == 0) {
                var price = 250;
            }
            else {
                var price = 150;
            }
        }
        else {
            var price = 200;
        }
        return price;
    };
    p.getSkillLevel = function (skill) {
        if (skill == 1) {
            return this._skill1Level;
        }
        else {
            return this._skill2Level;
        }
    };
    p._fighting = function () {
        _super.prototype._fighting.call(this);
        if (this._skill1Level > 0 && this._enemy && this._skill1Ticks < 0) {
            this._skill1Ticks = application.frameRate * 6;
            if (this._skill1Level == 1) {
                var count = 6;
                var claz = "Arrow5";
            }
            else if (this._skill1Level == 2) {
                var count = 8;
                var claz = "Arrow6";
            }
            else {
                var claz = "Arrow6";
                var count = 10;
            }
            var span = (application.frameRate << 1) / count;
            var force = Entity.random(30, 40);
            ;
            var enemies = application.battle.findEnemies(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
            for (var i = 0; i <= count; i++) {
                Bullet.shoot(this, enemies[i % enemies.length], claz, { force: force, idleTicks: Math.round(i * span) });
            }
        }
        this._skill1Ticks--;
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
        if (this._skill2Level > 0) {
            var towers = this.findNeighbors();
            for (var i = 0; i < towers.length; i++) {
                towers[i].incCritical(-this._getCritical(this._skill2Level));
            }
        }
    };
    p._getCritical = function (level) {
        if (level == 1) {
            var critical = 10;
        }
        else if (level == 2) {
            var critical = 15;
        }
        else {
            var critical = 20;
        }
        if (this._skill && this._skill.attrs.level == 5) {
            return Math.round(critical * 1.15);
        }
        else {
            return critical;
        }
    };
    p.getMuzzleX = function () {
        return this.x + 35 + 15;
    };
    p.getMuzzleY = function () {
        return this.y + 0;
    };
    return ArrowTower4;
}(ArrowTower));
egret.registerClass(ArrowTower4,'ArrowTower4');
//# sourceMappingURL=ArrowTower4.js.map