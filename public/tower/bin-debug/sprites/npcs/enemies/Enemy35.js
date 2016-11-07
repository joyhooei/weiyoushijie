var Enemy35 = (function (_super) {
    __extends(Enemy35, _super);
    function Enemy35() {
        _super.call(this);
        this.addClip("enemy35_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy35_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy35_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy35_dying", "east-dying")
            .addClip("enemy35_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy35,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._summonTicks = this._get(properties, "summonTicks", 5 * application.frameRate);
    };
    p._moving = function () {
        _super.prototype._moving.call(this);
        this._ticks++;
        if (this._ticks % this._summonTicks == 0) {
            var pos = this._ahead(10);
            this._born("Enemy29", pos[0], pos[1]);
            this._born("Enemy32", pos[0], pos[1]);
            this._born("Enemy33", pos[0], pos[1]);
        }
    };
    return Enemy35;
}(Enemy));
egret.registerClass(Enemy35,'Enemy35');
//# sourceMappingURL=Enemy35.js.map