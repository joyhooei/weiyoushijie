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
    return Bomb;
}(CastBullet));
egret.registerClass(Bomb,'Bomb');
//# sourceMappingURL=Bomb.js.map