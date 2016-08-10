var Soldier = (function (_super) {
    __extends(Soldier, _super);
    function Soldier() {
        _super.call(this);
    }
    var d = __define,c=Soldier,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._enemy = null;
        this._guardX = 0;
        this._gradeY = 0;
        this._guardRadius = 10;
    };
    p._stateChanged = function (oldState, newState) {
        if (newState == EntityState.guarding) {
            this._turn(this._direction8(this._guardX, this._gradeY));
        }
        _super.prototype._stateChanged.call(this, oldState, newState);
    };
    p._moving = function () {
        if (this._moveOneStep()) {
            if (this._enemy) {
                this._do(EntityState.fighting);
            }
            else {
                this._do(EntityState.guarding);
            }
        }
    };
    p._guarding = function () {
        this._findEnemy();
    };
    p._moveTo = function (x, y) {
        this.setPaths([[this.x, this.y], [x, y]]);
        this._do(EntityState.moving);
    };
    p._fighting = function () {
        if (this._state % this._hitSpeed == 0) {
            this._enemy.hitBy(this._damage);
            if (this._enemy.dying() && !this._findEnemy()) {
                this._moveTo(this._guardX, this._gradeY);
            }
        }
    };
    p._findEnemy = function () {
        this._enemy = application.battle.findEnemy(this.x, this.y, this._guardRadius);
        if (this._enemy) {
            this._moveTo(this._enemy.x, this._enemy.y);
            this._enemy.addSolider(this);
        }
        return this._enemy;
    };
    return Soldier;
}(NPC));
egret.registerClass(Soldier,'Soldier');
//# sourceMappingURL=Soldier.js.map