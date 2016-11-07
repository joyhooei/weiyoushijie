var Enemy25 = (function (_super) {
    __extends(Enemy25, _super);
    function Enemy25() {
        _super.call(this);
        this.addClip("enemy25_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy25_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy25_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy25_dying", "east-dying")
            .addClip("enemy25_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy25,p=c.prototype;
    return Enemy25;
}(Enemy));
egret.registerClass(Enemy25,'Enemy25');
//# sourceMappingURL=Enemy25.js.map