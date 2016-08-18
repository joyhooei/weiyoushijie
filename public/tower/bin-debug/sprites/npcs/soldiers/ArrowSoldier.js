var ArrowSoldier = (function (_super) {
    __extends(ArrowSoldier, _super);
    function ArrowSoldier() {
        _super.call(this);
    }
    var d = __define,c=ArrowSoldier,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
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
            var x = this.getMapX();
            var y = this.getMapY();
            if (this._enemy == null
                || !this._enemy.active()
                || !this._enemy.within(x, y, this._guardRadius)) {
                this._enemy = application.battle.findEnemy(x, y, this._guardRadius, [0]);
                if (this._enemy) {
                    this._face(this._enemy);
                }
            }
            if (this._enemy) {
                Bullet.shoot(this.getCenterX(), this.getCenterY(), this._enemy, "Arrow");
            }
            else {
                this.guard();
            }
        }
    };
    return ArrowSoldier;
}(Soldier));
egret.registerClass(ArrowSoldier,'ArrowSoldier');
//# sourceMappingURL=ArrowSoldier.js.map