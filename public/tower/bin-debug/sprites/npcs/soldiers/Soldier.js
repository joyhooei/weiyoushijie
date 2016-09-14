var Soldier = (function (_super) {
    __extends(Soldier, _super);
    function Soldier() {
        _super.call(this);
        this.touchEnabled = true;
    }
    var d = __define,c=Soldier,p=c.prototype;
    p.select = function (again) {
        if (again) {
            this.deselect();
            return false;
        }
        else {
            this._range = application.pool.get("GuardRange", { guardRadius: this._guardRadius });
            this._range.x = this.getCenterX() - this._guardRadius;
            this._range.y = this.getCenterY() - this._guardRadius;
            this._range.width = this._guardRadius << 1;
            this._range.height = this._guardRadius << 1;
            application.battle.addRange(this._range);
            return true;
        }
    };
    p.deselect = function () {
        if (this._range) {
            this._range.erase();
            this._range = null;
        }
    };
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._guardX = this._get(properties, 'guardX', 0);
        this._guardY = this._get(properties, 'guardY', 0);
        this._guardRadius = this._get(properties, 'guardRadius', 20);
        this._guardAltitudes = this._get(properties, 'guardAltitude', [-1, 0]);
        this._liveTicks = this._get(properties, 'liveTicks', -1);
        this._idleTicks = 1;
        this._enemy = null;
        this._range = null;
        this._creator = null;
    };
    p.update = function () {
        if (this._liveTicks > 0) {
            this._liveTicks--;
            if (this._liveTicks == 0) {
                if (this._enemy) {
                    this._enemy.rmvSoldier(this);
                }
                this.erase();
            }
        }
        return _super.prototype.update.call(this);
    };
    p.setCreator = function (creator) {
        this._creator = creator;
    };
    p._idle = function () {
        if ((this._creator == null || this._creator.active()) && this._ticks >= this._idleTicks) {
            this.moveTo(this._guardX, this._guardY);
            if (this._hp) {
                this._hp.move();
            }
        }
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
        if (this._range) {
            this._range.erase();
            this._range = null;
        }
        if (this._creator) {
            this._creator.createSoldier(this);
        }
    };
    p.relive = function (idleTicks) {
        if (idleTicks === void 0) { idleTicks = 0; }
        if (idleTicks == 0) {
            idleTicks = this._idleTicks;
        }
        var soldier = application.pool.get(this.getClassName(), { guardX: this._guardX, guardY: this._guardY, idleTicks: idleTicks });
        soldier.x = this.x;
        soldier.y = this.y;
        soldier.width = this.width;
        soldier.height = this.height;
        soldier.setCreator(this._creator);
        return soldier;
    };
    p.moveTo = function (x, y) {
        var x1 = x - (this.width >> 1);
        var y1 = y - this.height;
        this._turn(this._direction8(x1, y1));
        if (this._computeSteps(this.x, this.y, x1, y1)) {
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
        if (this._range) {
            this._range.x = this.getCenterX() - this._guardRadius;
            this._range.y = this.getCenterY() - this._guardRadius;
        }
        if (this._hp) {
            this._hp.cure();
        }
    };
    p._guarding = function () {
        var enemy = this._findEnemy();
        if (enemy) {
            this._fightWith(enemy);
        }
        if (this._hp) {
            this._hp.cure();
        }
    };
    p._fightWith = function (enemy) {
        if (this._enemy) {
            this._enemy.rmvSoldier(this);
        }
        this._enemy = enemy;
        var h = this._enemy.height;
        var w = this._enemy.width;
        var xDeltas = [-w, -w, -w, -w, -w, -w, -w, -w];
        var yDeltas = [-h, -h, 0, h, h, h, 0, -h];
        var direction = this._direction8(this._enemy.x, this._enemy.y);
        this.moveTo(this._enemy.x - xDeltas[direction], this._enemy.y - xDeltas[direction]);
        this._enemy.addSoldier(this);
    };
    p._hitOpponents = function () {
        if (!this._enemy || this._enemy.hitBy(this)) {
            var enemy = this._findEnemy();
            if (enemy) {
                this._fightWith(enemy);
            }
            else {
                this._enemy = null;
                this.moveTo(this._guardX, this._guardY);
            }
        }
        else if (this._enemy.totalSoldiers() > 1) {
            var enemy = this._findEnemy();
            if (enemy && enemy.totalSoldiers() == 0) {
                this._enemy.rmvSoldier(this);
                this._fightWith(enemy);
            }
        }
    };
    p._findEnemy = function () {
        return application.battle.findSuitableEnemy(this.x, this.y, this._guardRadius, this._guardAltitudes);
    };
    return Soldier;
}(NPC));
egret.registerClass(Soldier,'Soldier',["SelectableEntity"]);
//# sourceMappingURL=Soldier.js.map