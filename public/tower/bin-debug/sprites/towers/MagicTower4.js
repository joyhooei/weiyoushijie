var MagicTower4 = (function (_super) {
    __extends(MagicTower4, _super);
    function MagicTower4() {
        _super.call(this);
        this.addBitmap("magictower4_png");
        this._bulletClaz = "Magic4";
    }
    var d = __define,c=MagicTower4,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._skill1Level = 0;
        this._skill1Ticks = 0;
        this._skill2Level = 0;
        this._blackImpermanence = null;
    };
    p.upgrade = function (skill) {
        if (skill == 1) {
            if (this._skill1Level == 0) {
                var price = 325;
            }
            else {
                var price = 200;
            }
            this._skill1Level++;
        }
        else {
            if (this._skill1Level == 0) {
                var price = 300;
            }
            else {
                var price = 150;
            }
            this._skill2Level++;
            if (this._blackImpermanence) {
                this._blackImpermanence.erase();
            }
            this._addBlackImpermanence();
        }
        application.battle.incGolds(-price);
    };
    p._addBlackImpermanence = function () {
        if (this._skill2Level == 1) {
            var options = { hp: 250, arm: 40, forceHigh: 10, forceLow: 5, guardX: this._guardX, guardY: this._guardY };
        }
        else if (this._skill2Level == 2) {
            var options = { hp: 300, arm: 45, forceHigh: 15, forceLow: 10, guardX: this._guardX, guardY: this._guardY };
        }
        else {
            var options = { hp: 350, arm: 50, forceHigh: 20, forceLow: 15, guardX: this._guardX, guardY: this._guardY };
        }
        this._blackImpermanence = application.pool.get("BlackImpermanence", options);
        this._blackImpermanence.setCenterX(this.getMuzzleX());
        this._blackImpermanence.setCenterY(this.getMuzzleY());
        this._blackImpermanence.setCreator(this);
        application.battle.addSoldier(this._blackImpermanence);
    };
    p.createSoldier = function (soldier) {
        this._blackImpermanence = soldier.relive(application.frameRate * 12);
        application.battle.addSoldier(this._blackImpermanence);
        this._blackImpermanence.setCreator(this);
        return this._blackImpermanence;
    };
    p._fighting = function () {
        _super.prototype._fighting.call(this);
        if (this._skill1Ticks >= application.frameRate * 12 && this._skill1Level > 0 && this._enemy) {
            this._skill1Ticks = 0;
            if (this._skill1Level == 1) {
                var fightTicks = 4;
            }
            else if (this._skill1Level == 2) {
                var fightTicks = 5;
            }
            else {
                var fightTicks = 6;
            }
            var bullet = application.pool.get("BlackWater", { hitRaduis: this._guardRadius, fightTicks: fightTicks * application.frameRate });
            bullet.setShooter(this);
            bullet.fight();
            application.battle.addBullet(bullet);
        }
        this._skill1Ticks++;
    };
    p.getMuzzleX = function () {
        return this.x + 40;
    };
    p.getMuzzleY = function () {
        return this.y + 15;
    };
    p.targetKilled = function (target) {
        if (target.getMaxHp() < 500) {
            if (this._blackImpermanence && this._blackImpermanence.active()) {
                var soldier = application.pool.get("Ghost", { guardX: target.getCenterX(), guardY: target.getBottomY(), forceLow: 2, forceHigh: 9, arm: 20 });
            }
            else {
                var soldier = application.pool.get("Ghost", { guardX: target.getCenterX(), guardY: target.getBottomY() });
            }
        }
        else {
            if (this._blackImpermanence && this._blackImpermanence.active()) {
                var soldier = application.pool.get("WhiteImpermanence", { guardX: target.getCenterX(), guardY: target.getBottomY(), forceLow: 3, forceHigh: 15, arm: 40 });
            }
            else {
                var soldier = application.pool.get("WhiteImpermanence", { guardX: target.getCenterX(), guardY: target.getBottomY() });
            }
        }
        soldier.setCenterX(target.getCenterX());
        soldier.setBottomY(target.getBottomY());
        application.battle.addSoldier(soldier);
    };
    return MagicTower4;
}(MagicTower));
egret.registerClass(MagicTower4,'MagicTower4',["SoldierCreator"]);
//# sourceMappingURL=MagicTower4.js.map