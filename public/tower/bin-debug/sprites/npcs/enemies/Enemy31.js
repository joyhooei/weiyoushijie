var Enemy31 = (function (_super) {
    __extends(Enemy31, _super);
    function Enemy31() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy31,p=c.prototype;
    return Enemy31;
}(ShootEnemy));
egret.registerClass(Enemy31,'Enemy31');
//# sourceMappingURL=Enemy31.js.map