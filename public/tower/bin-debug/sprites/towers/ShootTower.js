var ShootTower = (function (_super) {
    __extends(ShootTower, _super);
    function ShootTower() {
        _super.apply(this, arguments);
    }
    var d = __define,c=ShootTower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._shootSpeed = this._get(properties, "shootSpeed", 60);
    };
    p._guarding = function () {
        this._enemy = this._findEnemy();
        if (this._enemy) {
            this.fight();
        }
    };
    p.targetKilled = function (target) {
    };
    p.getMuzzleX = function () {
        return this.getCenterX();
    };
    p.getMuzzleY = function () {
        return this.y;
    };
    p._fighting = function () {
        if (this._ticks % this._shootSpeed == 0) {
            if (this._enemy == null
                || !this._enemy.active()
                || !this._enemy.within(this.getCenterX(), this.getCenterY(), this._guardRadius)) {
                this._enemy = this._findEnemy();
            }
            if (this._enemy) {
                this._shoot();
            }
            else {
                this.guard();
            }
        }
        this._ticks++;
    };
    p._shoot = function () {
        Bullet.shoot(this, this._enemy, this._bulletClaz, { force: this.getForce() });
    };
    p._findEnemy = function () {
        return application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0]);
    };
    return ShootTower;
}(Tower));
egret.registerClass(ShootTower,'ShootTower',["Shooter"]);
//# sourceMappingURL=ShootTower.js.map