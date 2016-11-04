var Enemy10 = (function (_super) {
    __extends(Enemy10, _super);
    function Enemy10() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy10,p=c.prototype;
    return Enemy10;
}(Enemy));
egret.registerClass(Enemy10,'Enemy10');
//# sourceMappingURL=Enemy10.js.map