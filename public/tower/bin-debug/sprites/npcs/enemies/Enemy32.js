var Enemy32 = (function (_super) {
    __extends(Enemy32, _super);
    function Enemy32() {
        _super.call(this);
        this.addClip("enemy32_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy32_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy32_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy32_dying", "east-dying")
            .addClip("enemy32_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy32,p=c.prototype;
    p.update = function () {
        this._stealthTicks--;
        if (this._stealthTicks > 0) {
            var lastPath = this._paths[this._paths.length - 1];
            var distance = (this.x - lastPath[0]) * (this.x - lastPath[0]) + (this.y - lastPath[1]) * (this.y - lastPath[1]);
            if (distance <= 100) {
                this._altitude = 0;
            }
        }
        else if (this._stealthTicks == 0) {
            this._altitude = 0;
        }
        return _super.prototype.update.call(this);
    };
    p.damage = function (d) {
        if (this.active()) {
            var oldHp = this._hp.getHp();
            if (this._hp.damage(d)) {
                this.kill();
                return true;
            }
            else {
                if (oldHp > ((this._hp.getMaxHp() << 1)) && this._hp.getHp() <= (this._hp.getMaxHp() << 1)) {
                    this._stealthTicks = 8 * application.frameRate;
                    this._altitude = -1;
                }
                return false;
            }
        }
        else {
            return true;
        }
    };
    return Enemy32;
}(Enemy));
egret.registerClass(Enemy32,'Enemy32');
//# sourceMappingURL=Enemy32.js.map