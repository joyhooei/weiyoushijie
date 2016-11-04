var Enemy23 = (function (_super) {
    __extends(Enemy23, _super);
    function Enemy23() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy23,p=c.prototype;
    return Enemy23;
}(Enemy));
egret.registerClass(Enemy23,'Enemy23');
//# sourceMappingURL=Enemy23.js.map