var Enemy12 = (function (_super) {
    __extends(Enemy12, _super);
    function Enemy12() {
        _super.call(this);
        this.addClip("enemy12_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy12_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy12_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy12_dying", "east-dying")
            .addClip("enemy12_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy12,p=c.prototype;
    return Enemy12;
}(Enemy));
egret.registerClass(Enemy12,'Enemy12');
//# sourceMappingURL=Enemy12.js.map