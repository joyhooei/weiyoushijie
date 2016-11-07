var Enemy17 = (function (_super) {
    __extends(Enemy17, _super);
    function Enemy17() {
        _super.call(this);
        this.addClip("enemy17_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy17_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy17_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy17_dying", "east-dying")
            .addClip("enemy17_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy17,p=c.prototype;
    p._hitOpponents = function () {
        _super.prototype._hitOpponents.call(this);
        var s = this.firstSoldier();
        if (s) {
            s.black(5, 2 * application.frameRate, false);
        }
    };
    return Enemy17;
}(ShootEnemy));
egret.registerClass(Enemy17,'Enemy17');
//# sourceMappingURL=Enemy17.js.map