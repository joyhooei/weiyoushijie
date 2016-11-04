var Enemy28 = (function (_super) {
    __extends(Enemy28, _super);
    function Enemy28() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy28,p=c.prototype;
    return Enemy28;
}(SummonEnemy));
egret.registerClass(Enemy28,'Enemy28');
//# sourceMappingURL=Enemy28.js.map