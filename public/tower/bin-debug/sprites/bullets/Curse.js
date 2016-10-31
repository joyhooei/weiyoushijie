var Curse = (function (_super) {
    __extends(Curse, _super);
    function Curse() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Curse,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hitRadius = this._get(properties, 'hitRadius', 50);
        this._curseTicks = this._get(properties, 'curseTicks', application.frameRate << 2);
    };
    p._hitTarget = function () {
        var enemies = this._findEnemeies();
        for (var i = 0; i < enemies.length; i++) {
            this._hitEnemy(enemies[i], this._force, this._curseTicks);
        }
    };
    p._findEnemeies = function () {
        return application.battle.findEnemies(this.getCenterX(), this.getCenterY(), this._hitRadius, [-1, 0, 1]);
    };
    p._hitEnemy = function (enemy, force, ticks) {
    };
    return Curse;
}(Bullet));
egret.registerClass(Curse,'Curse');
//# sourceMappingURL=Curse.js.map