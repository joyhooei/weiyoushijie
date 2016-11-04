var Enemy9 = (function (_super) {
    __extends(Enemy9, _super);
    function Enemy9() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy9,p=c.prototype;
    p._hitOpponents = function () {
        _super.prototype._hitOpponents.call(this);
        var s = this.firstSoldier();
        if (s) {
            s.black(5, 2 * application.frameRate, false);
        }
    };
    return Enemy9;
}(Enemy));
egret.registerClass(Enemy9,'Enemy9');
//# sourceMappingURL=Enemy9.js.map