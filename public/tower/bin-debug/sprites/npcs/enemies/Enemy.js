var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Enemy,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._bonus = this._get(properties, "bonus", 10);
        this._livesTaken = this._get(properties, "livesTaken", 1);
        this._soldiers = [null, null, null, null, null, null];
        this._totalSoldiers = 0;
        this._paths = this._get(properties, "paths", 10);
        this._path = 0;
        this._nextPath();
    };
    p.addSoldier = function (soldier) {
        for (var i = 0; i < this._soldiers.length; i++) {
            if (this._soldiers[i] == soldier) {
                return;
            }
        }
        var hitPos = this._getHitPosition(soldier);
        this._soldiers[hitPos] = soldier;
        this._totalSoldiers++;
        if (this._state == EntityState.moving) {
            this.guard();
            this._face(soldier);
        }
        return hitPos;
    };
    p._getHitPosition = function (soldier) {
        if (soldier.x < this.x) {
            //检查左边有没有攻击位置
            for (var i = 0; i < 3; i++) {
                if (this._soldiers[i] == null) {
                    return i;
                }
            }
            for (var i = 3; i < 6; i++) {
                if (this._soldiers[i] == null) {
                    return i;
                }
            }
        }
        else {
            //检查右边有没有攻击位置
            for (var i = 3; i < 6; i++) {
                if (this._soldiers[i] == null) {
                    return i;
                }
            }
            for (var i = 0; i < 3; i++) {
                if (this._soldiers[i] == null) {
                    return i;
                }
            }
        }
        return -1;
    };
    p.totalSoldiers = function () {
        return this._totalSoldiers;
    };
    p.firstSoldier = function () {
        for (var i = 0; i < this._soldiers.length; i++) {
            if (this._soldiers[i]) {
                return this._soldiers[i];
            }
        }
        return null;
    };
    p.rmvSoldier = function (soldier) {
        for (var i = 0; i < this._soldiers.length; i++) {
            if (this._soldiers[i] == soldier) {
                this._soldiers[i] = null;
                this._totalSoldiers--;
            }
        }
        if (this._totalSoldiers > 0) {
            this._face(this.firstSoldier());
        }
        else {
            this._moveAgain();
        }
    };
    p._nextPath = function () {
        if (this._path < this._paths.length - 1) {
            var p0 = this._paths[this._path];
            this.setCenterX(p0[0]);
            this.setBottomY(p0[1]);
            this._path++;
            var p1 = this._paths[this._path];
            this._computeSteps(p0[0], p0[1], p1[0], p1[1]);
            this._turn(this._directionAt(p1[0], p1[1]));
            return true;
        }
        else {
            return false;
        }
    };
    p.kill = function () {
        _super.prototype.kill.call(this);
        application.battle.incGolds(this._bonus);
    };
    p._moveAgain = function () {
        //格斗结束后，继续行走需要转向
        this._turn(this._directionAt(this._paths[this._path][0], this._paths[this._path][1]));
        this.move();
    };
    p._moving = function () {
        if (this._moveOneStep() && !this._nextPath()) {
            this._arrive();
        }
    };
    //到达目的地
    p._arrive = function () {
        application.battle.incLives(-this._livesTaken);
        this.erase();
    };
    p._fighting = function () {
        _super.prototype._fighting.call(this);
        //soldier may be killed by many enemies
        for (var i = 0; i < this._soldiers.length; i++) {
            if (this._soldiers[i] && !this._soldiers[i].active()) {
                this.rmvSoldier(this._soldiers[i]);
            }
        }
    };
    p._hitOpponents = function () {
        var s = this.firstSoldier();
        if (s) {
            if (s.hitBy(this)) {
                this.rmvSoldier(s);
            }
        }
        else {
            this._moveAgain();
        }
    };
    p._born = function (claz, x, y) {
        var e = application.pool.get(claz);
        e.stand(x, y);
        application.battle.addEnemy(e);
        return e;
    };
    return Enemy;
}(NPC));
egret.registerClass(Enemy,'Enemy');
//# sourceMappingURL=Enemy.js.map