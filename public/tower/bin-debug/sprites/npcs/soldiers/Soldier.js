var Soldier = (function (_super) {
    __extends(Soldier, _super);
    function Soldier() {
        _super.call(this);
    }
    var d = __define,c=Soldier,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._enemy = null;
        this._guardX = this._get(properties, 'guardX', 0);
        this._guardY = this._get(properties, 'guardY', 0);
        this._guardRadius = this._get(properties, 'guardRadius', 10);
        this._guardAltitude = this._get(properties, 'guardAltitude', [-1, 0]);
    };
    p.moveTo = function (x, y) {
        this._computeSteps(x, y);
        this._do(EntityState.moving);
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
        var enemy = this._findEnemy();
        if (enemy) {
            this._fightWith(enemy);
        }
    };
    p._fightWith = function (enemy) {
        if (this._enemy) {
            this._enemy.rmvSolider(this);
        }
        this._enemy = enemy;
        this.moveTo(this._enemy.x, this._enemy.y);
        this._enemy.addSolider(this);
    };
    p._fighting = function () {
        if (this._ticks % this._hitSpeed == 0) {
            this._enemy.fight();
            if (this._enemy.hitBy(this._damage)) {
                var enemy = this._findEnemy();
                if (enemy) {
                    this._fightWith(enemy);
                }
                else {
                    this.moveTo(this._guardX, this._guardY);
                }
            }
            else if (this._enemy.totalSoliders() > 1) {
                var enemy = this._findEnemy();
                if (enemy && enemy.totalSoliders() == 0) {
                    this._fightWith(enemy);
                }
            }
        }
    };
    p._findEnemy = function () {
        return application.battle.findSuitableEnemy(this._guardX, this._guardY, this._guardRadius, [this._guardAltitude]);
    };
    return Soldier;
}(NPC));
egret.registerClass(Soldier,'Soldier');
//# sourceMappingURL=Soldier.js.map