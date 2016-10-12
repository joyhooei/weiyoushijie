var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC() {
        _super.call(this);
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
        this._skill = 0;
        this._hitSpeed = this._get(properties, "hitSpeed", Math.round(0.9 * application.frameRate));
        this._force = this._get(properties, "force", 10);
        this._armor = this._get(properties, "armor", 0);
        this._magicArmor = this._get(properties, "magicArmor", 0);
        this._resistance = this._get(properties, "_resistance", 0);
        this._altitude = this._get(properties, "altitude", 0);
    };
    p.getForce = function () {
        return this._force;
    };
    p.kill = function () {
        this._hp.erase();
        this._hp = null;
        _super.prototype.kill.call(this);
    };
    p.erase = function () {
        if (this._hp) {
            this._hp.erase();
            this._hp = null;
        }
        _super.prototype.erase.call(this);
    };
    p.shootBy = function (bullet) {
        return this.damage(this._actualForce(bullet.getForce(), bullet.getHitType()));
    };
    p.hitBy = function (npc) {
        this.fight();
        var d = npc.getForce();
        if (this._resistance > 0) {
            npc.damage(Math.round(d * (100 - this._resistance) / 100));
        }
        return this.damage(this._actualForce(d, HitType.normal));
    };
    p._actualForce = function (d, hitType) {
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
    p.reachable = function (x, y, radius, altitudes) {
        return this.active() && this._altitude in altitudes && this.within(x, y, radius);
    };
    p._face = function (npc) {
        this._turn(this._direction4(npc.x, npc.y));
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
        if (this._fightClip) {
            if (!this._playingFightClip && this._readyFight()) {
                this._playingFightClip = true;
                this._play(this._fightClip, 1);
                this._fightClip.once(egret.Event.COMPLETE, function () {
                    this._hitOpponents();
                    this._playingFightClip = false;
                }, this);
            }
            this._ticks++;
        }
    };
    p._hitOpponents = function () {
    };
    p.paint = function () {
        var display = this._render(0, 5, this._skill);
        if (this._state != EntityState.fighting) {
            this._play(display, -1);
        }
        else {
            this._fightClip = display;
            this._playingFightClip = false;
        }
        this._centerHp();
    };
    p._centerHp = function () {
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