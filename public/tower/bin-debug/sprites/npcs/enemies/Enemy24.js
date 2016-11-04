var Enemy24 = (function (_super) {
    __extends(Enemy24, _super);
    function Enemy24() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy24,p=c.prototype;
    return Enemy24;
}(Enemy));
egret.registerClass(Enemy24,'Enemy24');
//# sourceMappingURL=Enemy24.js.map