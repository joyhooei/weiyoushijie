var Enemy35 = (function (_super) {
    __extends(Enemy35, _super);
    function Enemy35() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy35,p=c.prototype;
    return Enemy35;
}(Enemy));
egret.registerClass(Enemy35,'Enemy35');
//# sourceMappingURL=Enemy35.js.map