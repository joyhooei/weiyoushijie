var Enemy34 = (function (_super) {
    __extends(Enemy34, _super);
    function Enemy34() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy34,p=c.prototype;
    return Enemy34;
}(Enemy));
egret.registerClass(Enemy34,'Enemy34');
//# sourceMappingURL=Enemy34.js.map