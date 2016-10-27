var BlackWater = (function (_super) {
    __extends(BlackWater, _super);
    function BlackWater() {
        _super.call(this);
        this.addAllClips("blackwater_fighting", "fighting")
            .addAllClips("blackwater_building", "building");
    }
    var d = __define,c=BlackWater,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hitRadius = this._get(properties, 'hitRadius', 50);
    };
    p._act = function () {
        if (this._state == EntityState.fighting) {
            var enemies = application.battle.findEnemies(this.getCenterX(), this.getCenterY(), this._hitRadius, [0, 1]);
            for (var i = 0; i < enemies.length; i++) {
                enemies[i].shootBy(this);
            }
        }
        return _super.prototype._act.call(this);
    };
    return BlackWater;
}(Magic));
egret.registerClass(BlackWater,'BlackWater');
//# sourceMappingURL=BlackWater.js.map