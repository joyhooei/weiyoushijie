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
            this._moveToGuard();
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
    p.clone = function (properties) {
        properties.guardX = this._guardX;
        properties.guardY = this._guardY;
        return application.pool.get(this.getClaz(), properties);
    };
    p.guardAt = function (x, y) {
        this._guardX = x;
        this._guardY = y;
        //还没有敌人，直接走到新的守护地址
        if (this._enemy == null) {
            this._moveToGuard();
        }
    };
    //移动到守护地点
    p._moveToGuard = function () {
        this._enemy = null;
        this.moveTo(this._guardX, this._guardY);
        this.move();
    };
    //x和y是脚站立的位置
    p.moveTo = function (x, y) {
        _super.prototype.moveTo.call(this, x - (this.width >> 1), y - this.height);
    };
    p._arrive = function () {
        if (this._enemy) {
            if (this._enemy.active()) {
                this._face(this._enemy);
                this.fight();
            }
            else {
                this._moveToGuard();
            }
        }
        else {
            this.guard();
        }
    };
    p._moving = function () {
        _super.prototype._moving.call(this);
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
        if (this._enemy) {
            var hitPos = this._enemy.addSoldier(this);
            var margin = 3;
            if (hitPos < 3) {
                //左边
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
            this.move();
        }
        else {
            this._moveToGuard();
        }
    };
    p._hitOpponents = function () {
        if (!this._enemy || !this._enemy.active() || this._enemy.hitBy(this)) {
            this._fightWith(this._findEnemy());
        }
        else {
            if (this._enemy.totalSoldiers() > 1) {
                // find new enemy without soldiers
                var enemy = this._findEnemy();
                if (enemy && enemy.totalSoldiers() == 0) {
                    this._fightWith(enemy);
                }
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
egret.registerClass(Soldier,'Soldier',["Selectable"]);
//# sourceMappingURL=Soldier.js.map