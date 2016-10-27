var ShootSoldier = (function (_super) {
    __extends(ShootSoldier, _super);
    function ShootSoldier() {
        _super.call(this);
    }
    var d = __define,c=ShootSoldier,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
    };
    p._idle = function () {
        this.guard();
    };
    p._guarding = function () {
        this._enemy = application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
        if (this._enemy) {
            this._face(this._enemy);
            this.fight();
        }
    };
    p._fighting = function () {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._enemy == null
                || !this._enemy.active()
                || !this._enemy.within(this.x, this.y, this._guardRadius)) {
                this._enemy = application.battle.findEnemy(this.x, this.y, this._guardRadius, [0, 1]);
                if (this._enemy) {
                    this._face(this._enemy);
                }
            }
            if (this._enemy) {
                Bullet.shoot(this, this._enemy, this._bulletClaz, { force: this.getForce() });
            }
            else {
                this.guard();
            }
        }
        this._ticks++;
    };
    p.getMuzzleX = function () {
        return this.x;
    };
    p.getMuzzleY = function () {
        return this.y;
    };
    p.targetKilled = function (target) {
    };
    return ShootSoldier;
}(Soldier));
egret.registerClass(ShootSoldier,'ShootSoldier',["Shooter"]);
//# sourceMappingURL=ShootSoldier.js.map