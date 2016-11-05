var ArrowTower5 = (function (_super) {
    __extends(ArrowTower5, _super);
    function ArrowTower5() {
        _super.call(this);
        this.addBitmap("arrowtower5_png");
        this._bulletClaz = "Arrow4";
    }
    var d = __define,c=ArrowTower5,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._skill1Level = 0;
        this._skill1Ticks = 0;
        this._skill2Level = 0;
        this._skill2Ticks = 0;
    };
    p.upgradeSkill = function (skill) {
        if (skill == 1) {
            this._skill1Level++;
        }
        else {
            this._skill2Level++;
        }
    };
    p.skillUpgradable = function (skill) {
        if (skill == 1) {
            return this._skill1Level < 3;
        }
        else {
            return this._skill2Level < 3;
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
                var price = 200;
            }
        }
        else {
            var price = 150;
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
            this._skill1Ticks = application.frameRate * 12;
            var curseTicks = 3 * this._skill1Level * application.frameRate;
            var x = this._enemy.getCenterX();
            var y = this._enemy.getCenterY();
            Bullet.throw(x, y, x, y, "WeakCurse", { hitRaduis: this._guardRadius, curseTicks: curseTicks, fightingTicks: curseTicks });
        }
        this._skill1Ticks--;
        if (this._skill2Level > 0 && this._enemy && this._skill2Ticks < 0) {
            this._skill2Ticks = application.frameRate * 10;
            var curseTicks = 3 * this._skill2Level * application.frameRate;
            var x = this._enemy.getCenterX();
            var y = this._enemy.getCenterY();
            Bullet.throw(x, y, x, y, "MiscastCurse", { hitRaduis: this._guardRadius, curseTicks: curseTicks, fightingTicks: curseTicks });
        }
        this._skill2Ticks--;
    };
    p.getMuzzleX = function () {
        return this.x + 35 + 15;
    };
    p.getMuzzleY = function () {
        return this.y + 0;
    };
    return ArrowTower5;
}(ArrowTower));
egret.registerClass(ArrowTower5,'ArrowTower5');
//# sourceMappingURL=ArrowTower5.js.map