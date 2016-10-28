var Soldier = (function (_super) {
    __extends(Soldier, _super);
    function Soldier() {
        _super.call(this);
        this.touchEnabled = true;
    }
    var d = __define,c=Soldier,p=c.prototype;
    p.getGuardX = function () {
        return this._guardX;
    };
    p.getGuardY = function () {
        return this._guardY;
    };
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
            application.battle.addEntity(this._range);
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
        this._liveTicks = this._get(properties, 'liveTicks', 3600 * application.frameRate);
        this._enemy = null;
        this._range = null;
        this._creator = null;
    };
    p.update = function () {
        this._liveTicks--;
        if (this._liveTicks <= 0) {
            this.erase();
        }
        return _super.prototype.update.call(this);
    };
    p.setCreator = function (creator) {
        this._creator = creator;
    };
    p._idle = function () {
        this._ticks++;
        if (this._ticks >= this._idleTicks) {
            this.moveTo(this._guardX, this._guardY);
            if (this._hp) {
                this._hp.move();
            }
        }
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
        if (this._enemy) {
            this._enemy.rmvSoldier(this);
            this._enemy = null;
        }
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
        var soldier = application.pool.get(this.getClaz(), { guardX: this._guardX, guardY: this._guardY, idleTicks: idleTicks });
        soldier.x = this.x;
        soldier.y = this.y;
        soldier.setCreator(this._creator);
        return soldier;
    };
    p.guardAt = function (x, y) {
        this._guardX = x;
        this._guardY = y;
        //还没有敌人，直接走到新的守护地址
        if (this._enemy == null) {
            this.moveTo(x, y);
        }
    };
    //x和y是脚站立的位置
    p.moveTo = function (x, y) {
        var x1 = x - (this.width >> 1);
        var y1 = y - this.height;
        this._turn(this._directionAt(x, y));
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
        this._enemy = enemy;
        var hitPos = this._enemy.addSoldier(this);
        var margin = 3;
        if (hitPos < 3) {
            var x = enemy.x - (this.width >> 1) - margin;
        }
        else {
            var x = enemy.x + enemy.width + (this.width >> 1) + margin;
        }
        var direction = hitPos % 3;
        var y = enemy.getCenterY() + (this.height >> 1);
        if (direction == 1) {
            //上边
            y -= (this.height + margin);
        }
        else if (direction == 2) {
            //下边
            y += (this.height + margin);
        }
        this.moveTo(x, y);
    };
    p._hitOpponents = function () {
        if (this._enemy) {
            if (this._enemy.hitBy(this)) {
                // enemy is dying
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
                // find new enemy without soldiers
                var enemy = this._findEnemy();
                if (enemy && enemy.totalSoldiers() == 0) {
                    this._enemy.rmvSoldier(this);
                    this._fightWith(enemy);
                }
            }
        }
        else {
            var enemy = this._findEnemy();
            if (enemy) {
                this._fightWith(enemy);
            }
            else {
                this.moveTo(this._guardX, this._guardY);
            }
        }
    };
    p._findEnemy = function () {
        var enemy = application.battle.findSuitableEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, this._guardAltitudes);
        if (!enemy || enemy.totalSoldiers() >= 6) {
            return null;
        }
        else {
            return enemy;
        }
    };
    return Soldier;
}(NPC));
egret.registerClass(Soldier,'Soldier',["SelectableEntity"]);
//# sourceMappingURL=Soldier.js.map