var Enemy29 = (function (_super) {
    __extends(Enemy29, _super);
    function Enemy29() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy29,p=c.prototype;
    return Enemy29;
}(Enemy));
egret.registerClass(Enemy29,'Enemy29');
//# sourceMappingURL=Enemy29.js.map