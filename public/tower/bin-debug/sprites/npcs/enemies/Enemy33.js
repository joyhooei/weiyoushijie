var Enemy33 = (function (_super) {
    __extends(Enemy33, _super);
    function Enemy33() {
        _super.call(this);
        this.addClip("enemy33_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy33_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy33_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy33_dying", "east-dying")
            .addClip("enemy33_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy33,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._flashTicks = application.frameRate;
    };
    p._moving = function () {
        this._flashTicks--;
        if (this._flashTicks <= 0) {
            for (var i = 0; i < 10; i++) {
                if (this.active()) {
                    _super.prototype._moving.call(this);
                }
            }
            this._flashTicks = 5 * application.frameRate;
        }
    };
    return Enemy33;
}(Enemy));
egret.registerClass(Enemy33,'Enemy33');
//# sourceMappingURL=Enemy33.js.map