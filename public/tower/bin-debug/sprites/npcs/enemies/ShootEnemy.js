var ShootEnemy = (function (_super) {
    __extends(ShootEnemy, _super);
    function ShootEnemy() {
        _super.call(this);
        this._bulletClaz = "Arrow1";
    }
    var d = __define,c=ShootEnemy,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._shootRadius = this._get(properties, "shootRadius", 50);
    };
    p.targetKilled = function (target) {
    };
    p.getMuzzleX = function () {
        if (this._targetX > this.x) {
            return this.x + this.width;
        }
        else {
            return this.x;
        }
    };
    p.getMuzzleY = function () {
        return this.y;
    };
    p._moving = function () {
        var soldier = application.battle.findSuitableSoldier(this.getCenterX(), this.getCenterY(), this._shootRadius, [0, 1]);
        if (soldier) {
            this.addSoldier(soldier);
            this.fight();
        }
        else {
            _super.prototype._moving.call(this);
        }
    };
    p._hitOpponents = function () {
        var soldier = this.firstSoldier();
        if (soldier && soldier.active()) {
            Bullet.shoot(this, soldier, this._bulletClaz, { force: this.getForce() });
        }
        else {
            this.rmvSoldier(soldier);
        }
    };
    return ShootEnemy;
}(Enemy));
egret.registerClass(ShootEnemy,'ShootEnemy',["Shooter"]);
//# sourceMappingURL=ShootEnemy.js.map