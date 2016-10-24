var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.call(this);
    }
    var d = __define,c=Enemy,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._bonus = this._get(properties, "bonus", 10);
        this._idleTicks = this._get(properties, "idleTicks", 0);
        this._soldiers = [null, null, null, null, null, null];
        this._paths = this._get(properties, "paths", 10);
        this._path = 0;
        this._nextPath();
        this._frozenTicks = 0;
    };
    p.frozen = function () {
        this._frozenTicks = 3 * application.frameRate;
        if (this._clip) {
            this._clip.stop();
        }
    };
    p.update = function () {
        if (this._frozenTicks <= 0) {
            return _super.prototype.update.call(this);
        }
        else {
            this._frozenTicks--;
            if (this._frozenTicks <= 0) {
                if (this._clip) {
                    this._clip.gotoAndPlay(0, 1);
                }
            }
            return false;
        }
    };
    p.addSoldier = function (soldier) {
        for (var i = 0; i < this._soldiers.length; i++) {
            if (this._soldiers[i] == soldier) {
                return;
            }
        }
        var hitPos = this._getHitPosition(soldier);
        this._soldiers[hitPos] = soldier;
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
        var count = 0;
        for (var i = 0; i < this._soldiers.length; i++) {
            if (this._soldiers[i]) {
                count++;
            }
        }
        return count;
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
            }
        }
        var s = this.firstSoldier();
        if (s) {
            this._face(s);
        }
        else {
            this._moveAgain();
        }
    };
    p._nextPath = function () {
        var p0 = this._paths[this._path];
        this.setCenterX(p0[0]);
        this.setBottomY(p0[1]);
        this._path++;
        var p1 = this._paths[this._path];
        this._computeSteps(p0[0], p0[1], p1[0], p1[1]);
        this._turn(this._direction4(p1[0], p1[1]));
    };
    p.kill = function () {
        _super.prototype.kill.call(this);
        application.battle.incGolds(this._bonus);
    };
    p._moveAgain = function () {
        //格斗结束后，继续行走需要转向
        this._turn(this._direction4(this._paths[this._path][0], this._paths[this._path][1]));
        this.move();
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
    return Enemy;
}(NPC));
egret.registerClass(Enemy,'Enemy');
//# sourceMappingURL=Enemy.js.map