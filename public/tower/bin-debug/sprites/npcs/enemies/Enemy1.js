var Enemy1 = (function (_super) {
    __extends(Enemy1, _super);
    function Enemy1() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy1,p=c.prototype;
    return Enemy1;
}(Enemy));
egret.registerClass(Enemy1,'Enemy1');
//# sourceMappingURL=Enemy1.js.map