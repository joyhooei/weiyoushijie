//金角大王
var Enemy8 = (function (_super) {
    __extends(Enemy8, _super);
    function Enemy8() {
        _super.call(this);
        this.addClip("enemy8_east_moving", "east-moving")
            .addClip("enemy8_north_moving", "north-moving")
            .addClip("enemy8_east_guarding", "east-guarding")
            .addClip("enemy8_dying", "east-dying")
            .addClip("enemy8_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy8,p=c.prototype;
    return Enemy8;
}(Enemy));
egret.registerClass(Enemy8,'Enemy8');
//# sourceMappingURL=Enemy8.js.map