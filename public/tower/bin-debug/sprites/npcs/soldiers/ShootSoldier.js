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
        this._enemy = application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0]);
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
                this._enemy = application.battle.findEnemy(this.x, this.y, this._guardRadius, [0]);
                if (this._enemy) {
                    this._face(this._enemy);
                }
            }
            if (this._enemy) {
                Bullet.shootByNPC(this, this._enemy, this._bulletClaz);
                this._ticks++;
            }
            else {
                this.guard();
            }
        }
    };
    return ShootSoldier;
}(Soldier));
egret.registerClass(ShootSoldier,'ShootSoldier');
//# sourceMappingURL=ShootSoldier.js.map