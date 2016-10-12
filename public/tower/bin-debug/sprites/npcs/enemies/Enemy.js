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
        this._soldiers = [];
        this._paths = this._get(properties, "paths", 10);
        this._path = 0;
        this._nextPath();
        this._frozenTicks = 0;
    };
    p.frozen = function () {
        this._frozenTicks = 3 * application.frameRate;
        var display = this._getCurrentDisplay();
        if (display) {
            if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
                display.stop();
            }
        }
    };
    p.update = function () {
        if (this._frozenTicks <= 0) {
            return _super.prototype.update.call(this);
        }
        else {
            this._frozenTicks--;
            if (this._frozenTicks <= 0) {
                var display = this._getCurrentDisplay();
                if (display) {
                    if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
                        display.play();
                    }
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
        this._soldiers.push(soldier);
        if (this._state == EntityState.moving) {
            this.guard();
            this._face(soldier);
        }
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
            this._moveAgain();
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
        if (this._soldiers.length > 0) {
            if (this._soldiers[0].hitBy(this)) {
                this.rmvSoldier(this._soldiers[0]);
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