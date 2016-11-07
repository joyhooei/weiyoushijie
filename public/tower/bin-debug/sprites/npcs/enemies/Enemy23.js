var Enemy23 = (function (_super) {
    __extends(Enemy23, _super);
    function Enemy23() {
        _super.call(this);
        this.addClip("enemy23_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy23_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy23_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy23_dying", "east-dying")
            .addClip("enemy23_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy23,p=c.prototype;
    //攻击接触到的士兵
    p._hitOpponents = function () {
        var soldiers = application.battle.findSoldiers(this.getCenterX(), this.getCenterY(), 50);
        for (var i = 0; i < soldiers.length; i++) {
            var s = soldiers[i];
            if (s.hitBy(this)) {
                this.rmvSoldier(s);
            }
        }
    };
    return Enemy23;
}(Enemy));
egret.registerClass(Enemy23,'Enemy23');
//# sourceMappingURL=Enemy23.js.map