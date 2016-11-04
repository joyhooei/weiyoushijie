var Enemy18 = (function (_super) {
    __extends(Enemy18, _super);
    function Enemy18() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy18,p=c.prototype;
    //攻击接触到的士兵
    p._hitOpponents = function () {
        var soldiers = application.battle.findSoldiers(this.getCenterX(), this.getCenterY(), 50, [0]);
        for (var i = 0; i < soldiers.length; i++) {
            var s = soldiers[i];
            if (s.hitBy(this)) {
                this.rmvSoldier(s);
            }
        }
    };
    return Enemy18;
}(Enemy));
egret.registerClass(Enemy18,'Enemy18');
//# sourceMappingURL=Enemy18.js.map