var Enemy20 = (function (_super) {
    __extends(Enemy20, _super);
    function Enemy20() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy20,p=c.prototype;
    return Enemy20;
}(Enemy));
egret.registerClass(Enemy20,'Enemy20');
//# sourceMappingURL=Enemy20.js.map