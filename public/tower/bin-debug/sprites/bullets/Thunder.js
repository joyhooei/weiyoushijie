var Thunder = (function (_super) {
    __extends(Thunder, _super);
    function Thunder() {
        _super.call(this);
        this.addClip("thunder_fighting", "east-fighting");
    }
    var d = __define,c=Thunder,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hitRadius = this._get(properties, 'hitRadius', 200);
    };
    p._hitTarget = function () {
        var enemies = application.battle.findEnemies(this.x, this.y, this._hitRadius, [0, 1]);
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].shootBy(this);
        }
    };
    return Thunder;
}(Bullet));
egret.registerClass(Thunder,'Thunder');
//# sourceMappingURL=Thunder.js.map