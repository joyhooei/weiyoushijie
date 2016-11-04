var Enemy32 = (function (_super) {
    __extends(Enemy32, _super);
    function Enemy32() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy32,p=c.prototype;
    return Enemy32;
}(Enemy));
egret.registerClass(Enemy32,'Enemy32');
//# sourceMappingURL=Enemy32.js.map