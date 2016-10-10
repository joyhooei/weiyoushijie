var MagicTower = (function (_super) {
    __extends(MagicTower, _super);
    function MagicTower() {
        _super.call(this);
        this._bulletClaz = "Magic1";
    }
    var d = __define,c=MagicTower,p=c.prototype;
    p._guarding = function () {
        this._enemy = application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
        if (this._enemy) {
            this.fight();
        }
    };
    p._fighting = function () {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._enemy == null
                || !this._enemy.active()
                || !this._enemy.within(this.getCenterX(), this.getCenterY(), this._guardRadius)) {
                this._enemy = application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
            }
            if (this._enemy) {
                Bullet.shootAtNPC(this.getCenterX(), this.getCenterY(), this._enemy, this._bulletClaz, { force: this._force });
            }
            else {
                this.guard();
            }
        }
        this._ticks++;
    };
    return MagicTower;
}(Tower));
egret.registerClass(MagicTower,'MagicTower');
//# sourceMappingURL=MagicTower.js.map