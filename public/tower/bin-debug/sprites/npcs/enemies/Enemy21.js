var Enemy21 = (function (_super) {
    __extends(Enemy21, _super);
    function Enemy21() {
        _super.call(this);
        this.addClip("enemy21_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy21_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy21_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy21_dying", "east-dying")
            .addClip("enemy21_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy21,p=c.prototype;
    p._enterGroup = function (enemy) {
    };
    p._leaveGroup = function (enemy) {
        if (!enemy.active()) {
            this._born("Enemy22", enemy.getCenterX(), enemy.getCenterY());
        }
    };
    return Enemy21;
}(GroupEnemy));
egret.registerClass(Enemy21,'Enemy21');
//# sourceMappingURL=Enemy21.js.map