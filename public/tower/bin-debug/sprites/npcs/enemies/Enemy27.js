var Enemy27 = (function (_super) {
    __extends(Enemy27, _super);
    function Enemy27() {
        _super.call(this);
        this.addClip("enemy27_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy27_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy27_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy27_dying", "east-dying")
            .addClip("enemy27_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy27,p=c.prototype;
    return Enemy27;
}(Enemy));
egret.registerClass(Enemy27,'Enemy27');
//# sourceMappingURL=Enemy27.js.map