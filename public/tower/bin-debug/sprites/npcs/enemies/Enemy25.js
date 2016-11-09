var Enemy25 = (function (_super) {
    __extends(Enemy25, _super);
    function Enemy25() {
        _super.call(this);
        this.addClip("enemy25_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy25_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy25_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy25_dying", "east-dying")
            .addClip("enemy25_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy25,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hitTicks = 0;
    };
    //如果在他攻击一名士兵，这个士兵就无法移动或者攻击，如果5秒钟内没有杀死他, 士兵会死亡，并且转变为e21
    p._hitOpponents = function () {
        var s = this.firstSoldier();
        if (s) {
            this._hitTicks++;
            if (this._hitTicks >= 5 * application.frameRate) {
                s.kill();
                this._born("Enemy21", s.getCenterX(), s.getBottomY());
                this._hitTicks = 0;
            }
            else {
                s.frozen(0, 10, false, false);
                if (s.hitBy(this)) {
                    this.rmvSoldier(s);
                }
            }
        }
        else {
            this._moveAgain();
        }
    };
    return Enemy25;
}(Enemy));
egret.registerClass(Enemy25,'Enemy25');
//# sourceMappingURL=Enemy25.js.map