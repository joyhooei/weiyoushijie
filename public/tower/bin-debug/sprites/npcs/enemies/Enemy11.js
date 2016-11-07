var Enemy11 = (function (_super) {
    __extends(Enemy11, _super);
    function Enemy11() {
        _super.call(this);
        this.addClip("enemy11_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy11_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy11_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy11_dying", "east-dying")
            .addClip("enemy11_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy11,p=c.prototype;
    p.erase = function () {
        this._born("Enemy10", this.x, this.y);
        _super.prototype.erase.call(this);
    };
    return Enemy11;
}(Enemy));
egret.registerClass(Enemy11,'Enemy11');
//# sourceMappingURL=Enemy11.js.map