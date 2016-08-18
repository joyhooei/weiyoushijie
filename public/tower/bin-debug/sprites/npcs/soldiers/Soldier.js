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
        this._guardAltitudes = this._get(properties, 'guardAltitude', [-1, 0]);
    };
    p.moveTo = function (x, y) {
        if (this._computeSteps(x, y)) {
            this.move();
        }
        else {
            this._arrive();
        }
    };
    p._arrive = function () {
        if (this._enemy) {
            this._face(this._enemy);
            this.fight();
        }
        else {
            this.guard();
        }
    };
    p._moving = function () {
        if (this._moveOneStep()) {
            this._arrive();
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
            this._enemy.rmvSoldier(this);
        }
        this._enemy = enemy;
        var h = this._enemy.height;
        var w = this._enemy.width;
        var xDeltas = [0, w, w, w, 0, -w, -w, -w];
        var yDeltas = [-h, -h, 0, h, h, h, 0, -h];
        var direction = this._direction8(this._enemy.x, this._enemy.y);
        this.moveTo(this._enemy.x - xDeltas[direction], this._enemy.y - xDeltas[direction]);
        this._enemy.addSoldier(this);
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
            else if (this._enemy.totalSoldiers() > 1) {
                var enemy = this._findEnemy();
                if (enemy && enemy.totalSoldiers() == 0) {
                    this._fightWith(enemy);
                }
            }
        }
    };
    p._findEnemy = function () {
        return application.battle.findSuitableEnemy(this._guardX, this._guardY, this._guardRadius, this._guardAltitudes);
    };
    return Soldier;
}(NPC));
egret.registerClass(Soldier,'Soldier');
//# sourceMappingURL=Soldier.js.map