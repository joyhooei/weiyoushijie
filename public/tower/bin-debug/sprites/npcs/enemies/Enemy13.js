var Enemy13 = (function (_super) {
    __extends(Enemy13, _super);
    function Enemy13() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy13,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._summonTicks = this._get(properties, "summonTicks", 3 * application.frameRate);
    };
    p._moving = function () {
        _super.prototype._moving.call(this);
        this._ticks++;
        if (this._ticks % this._summonTicks == 0) {
            var pos = this._ahead(10);
            this._born("Bullet7", pos[0], pos[1]);
        }
    };
    return Enemy13;
}(ShootEnemy));
egret.registerClass(Enemy13,'Enemy13');
//# sourceMappingURL=Enemy13.js.map