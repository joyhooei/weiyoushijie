var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.call(this);
        this._abnormalDisplays = [new egret.Bitmap(RES.getRes("frozen_png")), new egret.Bitmap(RES.getRes("burn_png"))];
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
        this._abnormalState = 0;
        this._abnormalTicks = [-1, -1, -1, -1, -1];
        this._abnormalDamages = [0, 0, 0, 0, 0];
    };
    p.frozen = function (damage, ticks) {
        this._startAbnormal(1, damage, ticks);
    };
    p.burn = function (damage, ticks) {
        this._startAbnormal(2, damage, ticks);
    };
    p.weak = function (damage, ticks) {
        this._startAbnormal(3, damage, ticks);
    };
    p.miscast = function (damage, ticks) {
        this._startAbnormal(4, damage, ticks);
    };
    p.black = function (damage, ticks) {
        this._startAbnormal(5, damage, ticks);
    };
    p._startAbnormal = function (state, damage, ticks) {
        if (this._abnormalTicks[state - 1] <= 0) {
            this._abnormalState++;
            this._abnormalTicks[state - 1] = ticks;
            this._abnormalDamages[state - 1] = damage;
            if (state == 1 && this._clip) {
                this._clip.stop();
            }
            this._renderAbnormal(state);
        }
        else {
            this._abnormalTicks[state - 1] += ticks;
            this._abnormalDamages[state - 1] += damage;
        }
    };
    p._stopAbnormal = function (state) {
        this._abnormalState--;
        if (state == 1 && this._clip) {
            this._clip.gotoAndPlay(0, 1);
        }
        this._abnormalTicks[state - 1] = -1;
        this._clearAbnormal(state);
    };
    p._clearAbnormal = function (state) {
        var display = this._abnormalDisplays[state - 1];
        if (display) {
            this.removeChild(display);
        }
    };
    p._stopAllAbnormals = function () {
        for (var i = 0; i < this._abnormalTicks.length; i++) {
            if (this._abnormalTicks[i] > 0) {
                this._clearAbnormal(i + 1);
                this._abnormalTicks[i] = -1;
            }
        }
        this._abnormalState = 0;
    };
    p._renderAbnormal = function (state) {
        var display = this._abnormalDisplays[state - 1];
        if (display) {
            display.x = (this.width - display.width) >> 1;
            display.y = this.height - display.height;
            this.addChild(display);
        }
    };
    p.update = function () {
        if (this._abnormalState == 0) {
            return _super.prototype.update.call(this);
        }
        for (var i = 0; i < this._abnormalTicks.length; i++) {
            if (this._abnormalTicks[i] > 0) {
                if (this._abnormalTicks[i] % application.frameRate == 0) {
                    if (this.damage(this._abnormalDamages[i])) {
                        return _super.prototype.update.call(this);
                    }
                }
                this._abnormalTicks[i]--;
            }
            else if (this._abnormalTicks[i] == 0) {
                this._stopAbnormal(i + 1);
            }
        }
        if (this._abnormalTicks[0] > 0) {
            //冰冻
            return false;
        }
        else {
            return _super.prototype.update.call(this);
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
        var p0 = this._paths[this._path];
        this.setCenterX(p0[0]);
        this.setBottomY(p0[1]);
        this._path++;
        var p1 = this._paths[this._path];
        this._computeSteps(p0[0], p0[1], p1[0], p1[1]);
        this._turn(this._directionAt(p1[0], p1[1]));
    };
    p.kill = function () {
        _super.prototype.kill.call(this);
        this._stopAllAbnormals();
        application.battle.incGolds(this._bonus);
    };
    p._moveAgain = function () {
        //格斗结束后，继续行走需要转向
        this._turn(this._directionAt(this._paths[this._path][0], this._paths[this._path][1]));
        this.move();
    };
    p._moving = function () {
        if (this._moveOneStep()) {
            if (this._path < this._paths.length - 1) {
                this._nextPath();
            }
            else {
                application.battle.incLives(-this._livesTaken);
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