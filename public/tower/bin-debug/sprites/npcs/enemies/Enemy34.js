var Enemy34 = (function (_super) {
    __extends(Enemy34, _super);
    function Enemy34() {
        _super.call(this);
        this.addClip("enemy34_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy34_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy34_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy34_dying", "east-dying")
            .addClip("enemy34_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy34,p=c.prototype;
    p._hitOpponents = function () {
        var s = this.firstSoldier();
        if (s) {
            this._skillTicks--;
            if (this._skillTicks <= 0) {
                if (s.damage(this.getForce() * 3)) {
                    this.rmvSoldier(s);
                }
                this._skillTicks++;
            }
            else {
                if (s.hitBy(this)) {
                    this.rmvSoldier(s);
                }
            }
        }
        else {
            this._moveAgain();
        }
    };
    return Enemy34;
}(Enemy));
egret.registerClass(Enemy34,'Enemy34');
//# sourceMappingURL=Enemy34.js.map