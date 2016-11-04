var Enemy30 = (function (_super) {
    __extends(Enemy30, _super);
    function Enemy30() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy30,p=c.prototype;
    return Enemy30;
}(Enemy));
egret.registerClass(Enemy30,'Enemy30');
//# sourceMappingURL=Enemy30.js.map