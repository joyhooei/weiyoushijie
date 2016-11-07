var Enemy10 = (function (_super) {
    __extends(Enemy10, _super);
    function Enemy10() {
        _super.call(this);
        this.addClip("enemy10_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy10_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy10_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy10_dying", "east-dying")
            .addClip("enemy10_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy10,p=c.prototype;
    return Enemy10;
}(Enemy));
egret.registerClass(Enemy10,'Enemy10');
//# sourceMappingURL=Enemy10.js.map