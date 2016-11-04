var Enemy7 = (function (_super) {
    __extends(Enemy7, _super);
    function Enemy7() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy7,p=c.prototype;
    return Enemy7;
}(Enemy));
egret.registerClass(Enemy7,'Enemy7');
//# sourceMappingURL=Enemy7.js.map