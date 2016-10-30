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
        this._idleTicks = this._get(properties, "idleTicks", 0);
        this._soldiers = [null, null, null, null, null, null];
        this._totalSoldiers = 0;
        this._paths = this._get(properties, "paths", 10);
        this._path = 0;
        this._nextPath();
        this._abnormalState = 0;
        this._abnormalTicks = -1;
    };
    p.frozen = function (damage, ticks) {
        this._addAbnormal(1, damage, ticks);
    };
    p.burn = function (damage, ticks) {
        this._addAbnormal(2, damage, ticks);
    };
    p.posion = function (damage, ticks) {
        this._addAbnormal(3, damage, ticks);
    };
    p._addAbnormal = function (state, damage, ticks) {
        this._restore();
        this._abnormalState = state;
        this._abnormalTicks = ticks;
        this._abnormalDamage = damage;
        if (state == 1 && this._clip) {
            this._clip.stop();
        }
        var display = this._abnormalDisplays[this._abnormalState - 1];
        display.x = (this.width - display.width) >> 1;
        display.y = this.height - display.height;
        this._displaySprite.addChild(display);
    };
    p._restore = function () {
        if (this._abnormalState == 1 && this._clip) {
            this._clip.gotoAndPlay(0, 1);
        }
        try {
            this._displaySprite.removeChild(this._abnormalDisplays[this._abnormalState - 1]);
        }
        catch (error) {
        }
        this._abnormalState = 0;
        this._abnormalTicks = -1;
    };
    p.update = function () {
        if (this._abnormalState == 0) {
            return _super.prototype.update.call(this);
        }
        if (this._abnormalTicks >= 0) {
            if (this._abnormalTicks % application.frameRate == 0) {
                if (this.damage(this._abnormalDamage)) {
                    this._restore();
                }
            }
            this._abnormalTicks--;
        }
        else {
            this._restore();
        }
        if (this._abnormalState == 1) {
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