var Freeze = (function (_super) {
    __extends(Freeze, _super);
    function Freeze() {
        _super.call(this);
        this.addClip("freeze_moving", "south-moving").addClip("freeze_dying", "south-dying");
    }
    var d = __define,c=Freeze,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hitRadius = this._get(properties, 'hitRadius', 100);
    };
    p._hitTarget = function () {
        var enemies = application.battle.getEnemies();
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].frozen();
        }
    };
    return Freeze;
}(Bullet));
egret.registerClass(Freeze,'Freeze');
//# sourceMappingURL=Freeze.js.map