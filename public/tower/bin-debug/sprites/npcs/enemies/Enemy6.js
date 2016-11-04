var Enemy6 = (function (_super) {
    __extends(Enemy6, _super);
    function Enemy6() {
        _super.call(this);
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy6,p=c.prototype;
    p.erase = function () {
        this._born("Enemy7", this.x, this.y);
        _super.prototype.erase.call(this);
    };
    return Enemy6;
}(Enemy));
egret.registerClass(Enemy6,'Enemy6');
//# sourceMappingURL=Enemy6.js.map