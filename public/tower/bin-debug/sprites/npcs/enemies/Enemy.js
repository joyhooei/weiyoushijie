var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.call(this);
    }
    var d = __define,c=Enemy,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._bonus = this._get(properties, "bonus", 10);
        this._idleTicks = this._get(properties, "idleTicks", Math.random() * 500);
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
        if (this._path < this._paths.length - 1) {
            var path = this._paths[this._path];
            this.setCenterX(path[0]);
            this.setBottomY(path[1]);
            this._path++;
            this._readToMove();
            return true;
        }
        else {
            return false;
        }
    };
    p._readToMove = function () {
        var path = this._paths[this._path];
        this._turn(this._direction8(path[0], path[1]));
        this._computeSteps(path[0], path[1]);
    };
    p.move = function () {
        _super.prototype.move.call(this);
        var path = this._paths[this._path];
        this._turn(this._direction8(path[0], path[1]));
    };
    p.kill = function () {
        _super.prototype.kill.call(this);
        application.battle.incGolds(this._bonus);
    };
    p._moving = function () {
        if (this._moveOneStep()) {
            application.battle.incLives(-1);
            this.erase();
        }
    };
    //走一步，true表示已经到了终点
    p._moveOneStep = function () {
        return _super.prototype._moveOneStep.call(this) && !this._nextPath();
    };
    p._fighting = function () {
        if (this._soldiers.length > 0) {
            if (this._ticks % this._hitSpeed == 0) {
                if (this._soldiers[0].hitBy(this)) {
                    this.rmvSoldier(this._soldiers[0]);
                }
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