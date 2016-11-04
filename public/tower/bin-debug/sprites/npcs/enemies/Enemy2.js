var Enemy2 = (function (_super) {
    __extends(Enemy2, _super);
    function Enemy2() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy2,p=c.prototype;
    return Enemy2;
}(Enemy));
egret.registerClass(Enemy2,'Enemy2');
//# sourceMappingURL=Enemy2.js.map