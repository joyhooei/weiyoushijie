var Enemy25 = (function (_super) {
    __extends(Enemy25, _super);
    function Enemy25() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy25,p=c.prototype;
    return Enemy25;
}(Enemy));
egret.registerClass(Enemy25,'Enemy25');
//# sourceMappingURL=Enemy25.js.map