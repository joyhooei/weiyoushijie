var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC() {
        _super.call(this);
        this.width = this.height = 20;
    }
    var d = __define,c=NPC,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hp = application.pool.get("Hp", properties);
        this.addChild(this._hp);
        this._damage = this._get(properties, "damage", 10);
        this._hitSpeed = this._get(properties, "hitSpeed", 10);
        this._altitude = this._get(properties, "altitude", 0);
        this._idleTicks = this._get(properties, "idleTicks", Math.random() * 100);
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
    p.hitBy = function (damage) {
        if (this.active()) {
            if (this._hp.hitBy(damage)) {
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
    return NPC;
}(MovableEntity));
egret.registerClass(NPC,'NPC');
//# sourceMappingURL=NPC.js.map