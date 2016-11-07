var Enemy31 = (function (_super) {
    __extends(Enemy31, _super);
    function Enemy31() {
        _super.call(this);
        this.addClip("enemy31_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy31_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy31_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy31_dying", "east-dying")
            .addClip("enemy31_east_fighting", "east-fighting");
    }
    var d = __define,c=Enemy31,p=c.prototype;
    p._hitOpponents = function () {
        var s = this.firstSoldier();
        if (s) {
            if (Math.random() <= 0.1) {
                if (s.getSuperClaz() == "Hero") {
                    if (s.damage(100)) {
                        this.rmvSoldier(s);
                    }
                }
                else {
                    s.kill();
                    this.rmvSoldier(s);
                }
            }
            else {
                if (s.hitBy(this)) {
                    this.rmvSoldier(s);
                }
            }
        }
        else {
            this._moveAgain();
        }
    };
    p.kill = function () {
        _super.prototype.kill.call(this);
        var soldiers = application.battle.findSoldiers(this.getCenterX(), this.getCenterY(), 80);
        for (var i = 0; i < soldiers.length; i++) {
            soldiers[i].damage(50);
        }
    };
    return Enemy31;
}(ShootEnemy));
egret.registerClass(Enemy31,'Enemy31');
//# sourceMappingURL=Enemy31.js.map