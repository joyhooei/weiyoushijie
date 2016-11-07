var Enemy16 = (function (_super) {
    __extends(Enemy16, _super);
    function Enemy16() {
        _super.call(this);
        this.addClip("enemy16_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy16_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy16_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy16_dying", "east-dying")
            .addClip("enemy16_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy16,p=c.prototype;
    p.update = function () {
        if (this.active()) {
            var soldiers = application.battle.findSoldiers(this.getCenterX(), this.getCenterY(), 80);
            for (var i = 0; i < soldiers.length; i++) {
                if (soldiers[i].dead()) {
                    this.addMaxHp(50);
                }
            }
        }
        return _super.prototype.update.call(this);
    };
    return Enemy16;
}(Enemy));
egret.registerClass(Enemy16,'Enemy16');
//# sourceMappingURL=Enemy16.js.map