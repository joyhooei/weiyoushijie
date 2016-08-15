var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.call(this);
    }
    var d = __define,c=Enemy,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._golds = this._get(properties, "golds", 10);
        this._soliders = [];
        this._paths = [];
        this._path = 0;
    };
    p.setPaths = function (paths) {
        this._path = 0;
        this._paths = paths;
        return this._nextPath();
    };
    p.addSolider = function (solider) {
        this._soliders.push(solider);
        this.guard();
        this._face(this._soliders[0]);
    };
    p.totalSoliders = function () {
        return this._soliders.length;
    };
    p.rmvSolider = function (solider) {
        for (var i = 0; i < this._soliders.length; i++) {
            if (this._soliders[i] == solider) {
                this._soliders.splice(i, 1);
            }
        }
        if (this._soliders.length == 0) {
            this.move();
        }
        else {
            this._face(this._soliders[0]);
        }
    };
    p._nextPath = function () {
        if (this._path < this._paths.length - 1) {
            var path = this._paths[this._path];
            this.x = path[0];
            this.y = path[1];
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
    p._stateChanged = function (oldState, newState) {
        if (newState == EntityState.moving && oldState != EntityState.idle) {
            this._readToMove();
        }
        else if (newState == EntityState.dying) {
            application.battle.incGolds(this._golds);
        }
        _super.prototype._stateChanged.call(this, oldState, newState);
    };
    p._moving = function () {
        if (this._moveOneStep()) {
            application.battle.incLives(-1);
            this.erase();
        }
    };
    //走一步，true表示已经到了终点
    p._moveOneStep = function () {
        if (_super.prototype._moveOneStep.call(this) && !this._nextPath()) {
            //到达终点
            return true;
        }
        else {
            return false;
        }
    };
    p._fighting = function () {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._soliders[0].hitBy(this._damage)) {
                this.rmvSolider(this._soliders[0]);
            }
        }
    };
    return Enemy;
}(NPC));
egret.registerClass(Enemy,'Enemy');
//# sourceMappingURL=Enemy.js.map