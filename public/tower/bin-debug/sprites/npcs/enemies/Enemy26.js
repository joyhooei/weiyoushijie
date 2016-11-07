var Enemy26 = (function (_super) {
    __extends(Enemy26, _super);
    function Enemy26() {
        _super.call(this);
        this.addClip("enemy26_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy26_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy26_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy26_dying", "east-dying")
            .addClip("enemy26_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy26,p=c.prototype;
    return Enemy26;
}(Enemy));
egret.registerClass(Enemy26,'Enemy26');
//# sourceMappingURL=Enemy26.js.map