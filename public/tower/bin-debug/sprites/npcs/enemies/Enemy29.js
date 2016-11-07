var Enemy29 = (function (_super) {
    __extends(Enemy29, _super);
    function Enemy29() {
        _super.call(this);
        this.addClip("enemy29_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy29_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy29_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy29_dying", "east-dying")
            .addClip("enemy29_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy29,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._initialMoveSpeed = this._moveSpeed;
    };
    p.damage = function (d) {
        this._moveSpeed = Math.round((1 - this._hp.getHp() / this._hp.getMaxHp()) * 2 * this._initialMoveSpeed);
        return _super.prototype.damage.call(this, d);
    };
    return Enemy29;
}(Enemy));
egret.registerClass(Enemy29,'Enemy29');
//# sourceMappingURL=Enemy29.js.map