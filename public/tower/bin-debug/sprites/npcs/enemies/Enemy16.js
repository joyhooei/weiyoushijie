var Enemy16 = (function (_super) {
    __extends(Enemy16, _super);
    function Enemy16() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy16,p=c.prototype;
    return Enemy16;
}(Enemy));
egret.registerClass(Enemy16,'Enemy16');
//# sourceMappingURL=Enemy16.js.map