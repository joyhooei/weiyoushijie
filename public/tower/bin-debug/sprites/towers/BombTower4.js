var BombTower4 = (function (_super) {
    __extends(BombTower4, _super);
    function BombTower4() {
        _super.call(this);
        this._bulletClaz = "Bomb4";
        this.addBitmap("bombtower4_png");
    }
    var d = __define,c=BombTower4,p=c.prototype;
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
                var price = 400;
            }
            else {
                var price = 200;
            }
        }
        else {
            if (this._skill1Level == 0) {
                var price = 300;
            }
            else {
                var price = 250;
            }
        }
        return price;
    };
    p._fighting = function () {
        _super.prototype._fighting.call(this);
        if (this._skill1Ticks < 0 && this._skill1Level > 0 && this._enemy) {
            if (this._skill1Level == 1) {
                this._skill1Ticks = 26 * application.frameRate;
            }
            else if (this._skill1Level == 2) {
                this._skill1Ticks = 23 * application.frameRate;
            }
            else {
                this._skill1Ticks = 20 * application.frameRate;
            }
            Bullet.shoot(this, this._enemy, "Spike");
        }
        this._skill1Ticks--;
        if (this._skill2Ticks < 0 && this._skill2Level > 0 && this._enemy) {
            this._skill2Ticks = 12 * application.frameRate;
            if (this._skill2Level == 1) {
                var force = 80;
            }
            else if (this._skill2Level == 2) {
                var force = 140;
            }
            else {
                var force = 200;
            }
            Bullet.shoot(this, this._enemy, "ScorchedEarth", { hitRaduis: this._guardRadius, force: force });
        }
        this._skill2Ticks--;
    };
    p.getMuzzleX = function () {
        return this.x + 33;
    };
    p.getMuzzleY = function () {
        return this.y + 7;
    };
    return BombTower4;
}(BombTower));
egret.registerClass(BombTower4,'BombTower4');
//# sourceMappingURL=BombTower4.js.map