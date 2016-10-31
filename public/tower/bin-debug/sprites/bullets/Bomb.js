var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Bomb,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hitRadius = this._get(properties, 'hitRadius', 50);
    };
    p._hitTarget = function () {
        var enemies = application.battle.findEnemies(this.getCenterX(), this.getBottomY(), this._hitRadius, [0]);
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].shootBy(this);
        }
    };
    p._act = function () {
        if (this._state == EntityState.building) {
            this.move();
            return false;
        }
        return _super.prototype._act.call(this);
    };
    return Bomb;
}(CastBullet));
egret.registerClass(Bomb,'Bomb');
//# sourceMappingURL=Bomb.js.map