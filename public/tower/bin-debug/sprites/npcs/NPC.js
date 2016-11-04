var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC() {
        _super.call(this);
        this._abnormalDisplays = [new egret.Bitmap(RES.getRes("frozen_png")), new egret.Bitmap(RES.getRes("burn_png"))];
    }
    var d = __define,c=NPC,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hp = application.pool.get("Hp", properties);
        this._hp.height = 3;
        this._hp.width = 20;
        this._hp.x = 0;
        this._hp.y = 0;
        this.addChild(this._hp);
        this._hitSpeed = this._get(properties, "hitSpeed", Math.round(0.9 * application.frameRate));
        var force = this._get(properties, "force", 10);
        this._forceHigh = this._get(properties, "forceHigh", force);
        this._forceLow = this._get(properties, "forceLow", force);
        this._armor = this._get(properties, "armor", 0);
        this._magicArmor = this._get(properties, "magicArmor", 0);
        this._resistance = this._get(properties, "_resistance", 0);
        this._altitude = this._get(properties, "altitude", 0);
        this._abnormalState = 0;
        this._abnormalTicks = [-1, -1, -1, -1, -1];
        this._abnormalDamages = [0, 0, 0, 0, 0];
    };
    p.stand = function (x, y) {
        this.setCenterX(x);
        this.setBottomY(y);
    };
    p.getForce = function () {
        return Entity.random(this._forceLow, this._forceHigh);
    };
    p.getMaxHp = function () {
        return this._hp.getMaxHp();
    };
    p.erase = function () {
        if (this._hp) {
            this._hp.erase();
            this._hp = null;
        }
        _super.prototype.erase.call(this);
    };
    p.shootBy = function (bullet) {
        var dead = this.damage(this._actualDamage(bullet.getForce(), bullet.getHitType()));
        if (dead) {
            bullet.targetKilled(this);
        }
        return dead;
    };
    p.hitBy = function (npc) {
        this.fight();
        var d = npc.getForce();
        if (this._resistance > 0) {
            npc.damage(Math.round(d * (100 - this._resistance) / 100));
        }
        return this.damage(this._actualDamage(d, HitType.normal));
    };
    p._actualDamage = function (d, hitType) {
        if (hitType == HitType.normal) {
            return Math.round(d * (100 - this._armor) / 100);
        }
        else if (hitType == HitType.magic) {
            return Math.round(d * (100 - this._magicArmor) / 100);
        }
        else {
            return d;
        }
    };
    p.damage = function (d) {
        if (this.active()) {
            if (this._hp.damage(d)) {
                this.kill();
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    p.kill = function () {
        _super.prototype.kill.call(this);
        this._stopAllAbnormals();
    };
    p.frozen = function (damage, ticks, overlying) {
        if (overlying === void 0) { overlying = true; }
        this._startAbnormal(1, damage, ticks, overlying);
    };
    p.burn = function (damage, ticks, overlying) {
        if (overlying === void 0) { overlying = true; }
        this._startAbnormal(2, damage, ticks, overlying);
    };
    p.weak = function (damage, ticks, overlying) {
        if (overlying === void 0) { overlying = true; }
        this._startAbnormal(3, damage, ticks, overlying);
    };
    p.miscast = function (damage, ticks, overlying) {
        if (overlying === void 0) { overlying = true; }
        this._startAbnormal(4, damage, ticks, overlying);
    };
    p.black = function (damage, ticks, overlying) {
        if (overlying === void 0) { overlying = true; }
        this._startAbnormal(5, damage, ticks, overlying);
    };
    p._startAbnormal = function (state, damage, ticks, overlying) {
        if (this._abnormalTicks[state - 1] <= 0) {
            this._abnormalState++;
            this._abnormalTicks[state - 1] = ticks;
            this._abnormalDamages[state - 1] = damage;
            if (state == 1 && this._clip) {
                this._clip.stop();
            }
            this._renderAbnormal(state);
        }
        else {
            this._abnormalTicks[state - 1] = Math.max(ticks, this._abnormalTicks[state - 1]);
            if (overlying) {
                this._abnormalDamages[state - 1] += damage;
            }
        }
    };
    p._stopAbnormal = function (state) {
        this._abnormalState--;
        if (state == 1 && this._clip) {
            this._clip.gotoAndPlay(0, 1);
        }
        this._abnormalTicks[state - 1] = -1;
        this._clearAbnormal(state);
    };
    p._clearAbnormal = function (state) {
        var display = this._abnormalDisplays[state - 1];
        if (display) {
            this.removeChild(display);
        }
    };
    p._stopAllAbnormals = function () {
        for (var i = 0; i < this._abnormalTicks.length; i++) {
            if (this._abnormalTicks[i] > 0) {
                this._clearAbnormal(i + 1);
                this._abnormalTicks[i] = -1;
            }
        }
        this._abnormalState = 0;
    };
    p._renderAbnormal = function (state) {
        var display = this._abnormalDisplays[state - 1];
        if (display) {
            display.x = (this.width - display.width) >> 1;
            display.y = this.height - display.height;
            this.addChild(display);
        }
    };
    p.update = function () {
        if (this._abnormalState == 0) {
            return _super.prototype.update.call(this);
        }
        for (var i = 0; i < this._abnormalTicks.length; i++) {
            if (this._abnormalTicks[i] > 0) {
                if (this._abnormalTicks[i] % application.frameRate == 0) {
                    if (this.damage(this._abnormalDamages[i])) {
                        return _super.prototype.update.call(this);
                    }
                }
                this._abnormalTicks[i]--;
            }
            else if (this._abnormalTicks[i] == 0) {
                this._stopAbnormal(i + 1);
            }
        }
        if (this._abnormalTicks[0] > 0) {
            //冰冻
            return false;
        }
        else {
            return _super.prototype.update.call(this);
        }
    };
    p.reachable = function (x, y, radius, altitudes) {
        return this.active() && this._altitude in altitudes && this.within(x, y, radius);
    };
    p._face = function (npc) {
        this._turn(this._directionAt(npc.x, npc.y));
    };
    p._readyFight = function () {
        return this._ticks % this._hitSpeed == 0;
    };
    p._idle = function () {
        this._ticks++;
        if (this._ticks >= this._idleTicks) {
            this.move();
            if (this._hp) {
                this._hp.move();
            }
        }
    };
    p._fighting = function () {
        if (this._readyFight() && !this._clipPlaying) {
            this._play();
        }
        this._ticks++;
    };
    p._act = function () {
        if (this._state == EntityState.fighting) {
            this._hitOpponents();
            //需要等打击时间到才再一次播放动画
            return false;
        }
        else if (this._state == EntityState.dying) {
            //播放一次
            return false;
        }
        else {
            return true;
        }
    };
    p._render = function (xDelta, yDelta, idx) {
        if (xDelta === void 0) { xDelta = 0; }
        if (yDelta === void 0) { yDelta = 0; }
        if (idx === void 0) { idx = 0; }
        this._renderHp();
        return _super.prototype._render.call(this, 0, 5, 0);
    };
    p._renderHp = function () {
        if (this._hp) {
            var x = Math.min(0, (this.width - this._hp.width) >> 1);
            if (x != this._hp.x) {
                this._hp.x = x;
            }
        }
    };
    return NPC;
}(MovableEntity));
egret.registerClass(NPC,'NPC');
//# sourceMappingURL=NPC.js.map