var Fireball = (function (_super) {
    __extends(Fireball, _super);
    function Fireball() {
        _super.call(this);
        this.addAllClips("fireball_moving", "moving")
            .addAllClips("fireball_fighting", "fighting");
    }
    var d = __define,c=Fireball,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hitRadius = this._get(properties, 'hitRadius', 50);
    };
    p._hitTarget = function () {
        var enemies = application.battle.findEnemies(this.x, this.y, this._hitRadius, [0]);
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].shootBy(this);
        }
    };
    return Fireball;
}(Bullet));
egret.registerClass(Fireball,'Fireball');
//# sourceMappingURL=Fireball.js.map