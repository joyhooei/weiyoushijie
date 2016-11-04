var Enemy17 = (function (_super) {
    __extends(Enemy17, _super);
    function Enemy17() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy17,p=c.prototype;
    return Enemy17;
}(ShootEnemy));
egret.registerClass(Enemy17,'Enemy17');
//# sourceMappingURL=Enemy17.js.map