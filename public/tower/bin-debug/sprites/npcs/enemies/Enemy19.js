var Enemy19 = (function (_super) {
    __extends(Enemy19, _super);
    function Enemy19() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy19,p=c.prototype;
    return Enemy19;
}(ShootEnemy));
egret.registerClass(Enemy19,'Enemy19');
//# sourceMappingURL=Enemy19.js.map