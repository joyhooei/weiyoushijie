var Enemy15 = (function (_super) {
    __extends(Enemy15, _super);
    function Enemy15() {
        _super.call(this);
        this.addClip("enemy15_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy15_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy15_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy15_dying", "east-dying")
            .addClip("enemy15_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy15,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._summonTicks = this._get(properties, "summonTicks", 5 * application.frameRate);
    };
    p._moving = function () {
        _super.prototype._moving.call(this);
        this._ticks++;
        if (this._ticks % this._summonTicks) {
            var pos = this._ahead(2);
            this._born("Enemy36", pos[0] + 5, pos[1] + 5);
            this._born("Enemy36", pos[0], pos[1]);
            this._born("Enemy36", pos[0] - 5, pos[1] - 5);
        }
    };
    return Enemy15;
}(Enemy));
egret.registerClass(Enemy15,'Enemy15');
//# sourceMappingURL=Enemy15.js.map