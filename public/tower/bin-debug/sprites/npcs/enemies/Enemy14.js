//野猪
var Enemy14 = (function (_super) {
    __extends(Enemy14, _super);
    function Enemy14() {
        _super.call(this);
        this.addClip("enemy14_dying", "east-dying")
            .addClip("enemy14_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy14_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy14_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy14_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy14,p=c.prototype;
    return Enemy14;
}(Enemy));
egret.registerClass(Enemy14,'Enemy14');
//# sourceMappingURL=Enemy14.js.map