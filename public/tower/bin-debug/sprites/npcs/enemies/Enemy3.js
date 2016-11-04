var Enemy3 = (function (_super) {
    __extends(Enemy3, _super);
    function Enemy3() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy3,p=c.prototype;
    return Enemy3;
}(ShootEnemy));
egret.registerClass(Enemy3,'Enemy3');
//# sourceMappingURL=Enemy3.js.map