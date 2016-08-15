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
        this._do(EntityState.fighting);
    };
    p._fighting = function () {
        if (this._ticks % this._hitSpeed == 0) {
            var x = this.getMapX();
            var y = this.getMapY();
            if (this._enemy == null
                || this._enemy.dying()
                || this._enemy.dead()
                || !this._enemy.intersect(x, y, this._guardRadius)) {
                this._enemy = application.battle.findEnemy(x, y, this._guardRadius, [0]);
                this._face(this._enemy);
            }
            if (this._enemy) {
                var arrow = application.pool.get("Arrow");
                arrow.x = x;
                arrow.y = y;
                arrow.setTarget(this._enemy);
                application.battle.addBullet(arrow);
            }
        }
    };
    return ArrowSoldier;
}(Soldier));
egret.registerClass(ArrowSoldier,'ArrowSoldier');
//# sourceMappingURL=ArrowSoldier.js.map