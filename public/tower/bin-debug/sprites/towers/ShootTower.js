var ShootTower = (function (_super) {
    __extends(ShootTower, _super);
    function ShootTower() {
        _super.apply(this, arguments);
    }
    var d = __define,c=ShootTower,p=c.prototype;
    p._guarding = function () {
        this._enemy = application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
        if (this._enemy) {
            this.fight();
        }
    };
    p.getMuzzleX = function () {
        return this.getCenterX();
    };
    p.getMuzzleY = function () {
        return this.y;
    };
    p._fighting = function () {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._enemy == null
                || !this._enemy.active()
                || !this._enemy.within(this.getCenterX(), this.getCenterY(), this._guardRadius)) {
                this._enemy = application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
            }
            if (this._enemy) {
                Bullet.shootAtNPC(this.getMuzzleX(), this.getMuzzleY(), this._enemy, this._bulletClaz, { force: this._force });
            }
            else {
                this.guard();
            }
        }
        this._ticks++;
    };
    return ShootTower;
}(Tower));
egret.registerClass(ShootTower,'ShootTower');
//# sourceMappingURL=ShootTower.js.map