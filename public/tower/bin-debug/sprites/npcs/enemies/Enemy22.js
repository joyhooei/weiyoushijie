var Enemy22 = (function (_super) {
    __extends(Enemy22, _super);
    function Enemy22() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy22,p=c.prototype;
    return Enemy22;
}(Enemy));
egret.registerClass(Enemy22,'Enemy22');
//# sourceMappingURL=Enemy22.js.map