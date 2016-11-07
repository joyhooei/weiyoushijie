var Enemy19 = (function (_super) {
    __extends(Enemy19, _super);
    function Enemy19() {
        _super.call(this);
        this.addClip("enemy19_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy19_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy19_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy19_dying", "east-dying")
            .addClip("enemy19_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy19,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._cureTicks = application.frameRate;
    };
    p.update = function () {
        this._cureTicks--;
        if (this._cureTicks <= 0) {
            for (var i = 0; i < this._group.length; i++) {
                this._group[i].addMaxHp(20);
            }
            this._cureTicks = application.frameRate;
        }
        return _super.prototype.update.call(this);
    };
    p._enterGroup = function (enemy) {
    };
    p._leaveGroup = function (enemy) {
    };
    return Enemy19;
}(GroupEnemy));
egret.registerClass(Enemy19,'Enemy19');
//# sourceMappingURL=Enemy19.js.map