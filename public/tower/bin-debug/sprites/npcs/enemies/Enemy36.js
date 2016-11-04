var Enemy36 = (function (_super) {
    __extends(Enemy36, _super);
    function Enemy36() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy36,p=c.prototype;
    return Enemy36;
}(Enemy));
egret.registerClass(Enemy36,'Enemy36');
//# sourceMappingURL=Enemy36.js.map