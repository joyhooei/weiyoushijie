var Enemy33 = (function (_super) {
    __extends(Enemy33, _super);
    function Enemy33() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy33,p=c.prototype;
    return Enemy33;
}(Enemy));
egret.registerClass(Enemy33,'Enemy33');
//# sourceMappingURL=Enemy33.js.map