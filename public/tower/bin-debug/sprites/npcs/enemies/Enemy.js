var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.call(this);
    }
    var d = __define,c=Enemy,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._bonus = this._get(properties, "bonus", 10);
        this._idleTicks = this._get(properties, "idleTicks", Math.random() * 10 * application.frameRate);
        this._soldiers = [];
        this._paths = this._get(properties, "paths", 10);
        this._path = 0;
        this._nextPath();
    };
    p.addSoldier = function (soldier) {
        this._soldiers.push(soldier);
        this.guard();
        this._face(this._soldiers[0]);
    };
    p.totalSoldiers = function () {
        return this._soldiers.length;
    };
    p.rmvSoldier = function (soldier) {
        for (var i = 0; i < this._soldiers.length; i++) {
            if (this._soldiers[i] == soldier) {
                this._soldiers.splice(i, 1);
            }
        }
        if (this._soldiers.length == 0) {
            this.move();
        }
        else {
            this._face(this._soldiers[0]);
        }
    };
    p._nextPath = function () {
        var p0 = this._paths[this._path];
        this.setCenterX(p0[0]);
        this.setBottomY(p0[1]);
        this._path++;
        var p1 = this._paths[this._path];
        this._computeSteps(p0[0], p0[1], p1[0], p1[1]);
        this._turn(this._direction8(p1[0], p1[1]));
    };
    p.kill = function () {
        _super.prototype.kill.call(this);
        application.battle.incGolds(this._bonus);
    };
    p.move = function () {
        _super.prototype.move.call(this);
        //格斗结束后，继续行走需要转向
        this._turn(this._direction8(this._paths[this._path][0], this._paths[this._path][1]));
    };
    p._moving = function () {
        if (this._moveOneStep()) {
            if (this._path < this._paths.length - 1) {
                this._nextPath();
            }
            else {
                application.battle.incLives(-1);
                this.erase();
            }
        }
    };
    p._hitOpponents = function () {
        if (this._soldiers.length > 0) {
            if (this._soldiers[0].hitBy(this)) {
                this.rmvSoldier(this._soldiers[0]);
            }
        }
        else {
            this.move();
        }
    };
    return Enemy;
}(NPC));
egret.registerClass(Enemy,'Enemy');
//# sourceMappingURL=Enemy.js.map