var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.call(this);
    }
    var d = __define,c=Enemy,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._soliders = [];
    };
    p.addSolider = function (solider) {
        this._soliders.push(solider);
        if (this._state == EntityState.moving) {
            this._do(EntityState.guarding);
        }
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
            this._do(EntityState.moving);
        }
    };
    p._stateChanged = function (oldState, newState) {
        if (newState == EntityState.guarding) {
            this._turn(this._direction8(this._soliders[0].x, this._soliders[0].y));
        }
        _super.prototype._stateChanged.call(this, oldState, newState);
    };
    p._moving = function () {
        if (this._moveOneStep()) {
            application.battle.incLives(-1);
            this._do(EntityState.dead);
        }
    };
    p._fighting = function () {
        if (this._ticks % this._hitSpeed == 0) {
            this._soliders[0].hitBy(this._damage);
            if (this._soliders[0].dying() || this._soliders[0].dead()) {
                this._soliders.splice(0, 1);
                if (this._soliders.length == 0) {
                    this._do(EntityState.moving);
                }
            }
        }
    };
    return Enemy;
}(NPC));
egret.registerClass(Enemy,'Enemy');
//# sourceMappingURL=Enemy.js.map