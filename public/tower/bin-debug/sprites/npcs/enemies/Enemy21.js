var Enemy21 = (function (_super) {
    __extends(Enemy21, _super);
    function Enemy21() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy21,p=c.prototype;
    return Enemy21;
}(Enemy));
egret.registerClass(Enemy21,'Enemy21');
//# sourceMappingURL=Enemy21.js.map