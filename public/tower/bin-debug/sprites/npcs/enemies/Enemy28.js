var Enemy28 = (function (_super) {
    __extends(Enemy28, _super);
    function Enemy28() {
        _super.call(this);
        this.addClip("enemy28_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy28_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy28_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy28_dying", "east-dying")
            .addClip("enemy28_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy28,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._summonTicks = this._get(properties, "summonTicks", 5 * application.frameRate);
    };
    p._moving = function () {
        _super.prototype._moving.call(this);
        this._ticks++;
        if (this._ticks % this._summonTicks == 0) {
            var pos = this._ahead(1);
            this._born("Enemy27", pos[0], pos[1]);
        }
    };
    return Enemy28;
}(SummonEnemy));
egret.registerClass(Enemy28,'Enemy28');
//# sourceMappingURL=Enemy28.js.map