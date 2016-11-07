var Enemy30 = (function (_super) {
    __extends(Enemy30, _super);
    function Enemy30() {
        _super.call(this);
        this.addClip("enemy30_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy30_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy30_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy30_dying", "east-dying")
            .addClip("enemy30_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy30,p=c.prototype;
    p._hitOpponents = function () {
        var s = this.firstSoldier();
        if (s) {
            if (s.hitBy(this)) {
                this.rmvSoldier(s);
            }
            this._hp.setHp(this._hp.getHp() + this.getForce());
        }
        else {
            this._moveAgain();
        }
    };
    return Enemy30;
}(Enemy));
egret.registerClass(Enemy30,'Enemy30');
//# sourceMappingURL=Enemy30.js.map