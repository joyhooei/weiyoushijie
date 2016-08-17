var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC() {
        _super.call(this);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hp = application.pool.get("Hp", properties);
        this._hp.width = 18;
        this.addChild(this._hp);
        this._damage = this._get(properties, "damage", 10);
        this._hitSpeed = this._get(properties, "hitSpeed", 10);
        this._altitude = this._get(properties, "altitude", 0);
        this._idleTicks = this._get(properties, "idleTicks", Math.random() * 100);
    };
    p.getAltitude = function () {
        return this._altitude;
    };
    p.kill = function () {
        this._hp.erase();
        this._hp = null;
        _super.prototype.kill.call(this);
    };
    p.hitBy = function (damage) {
        if (this.active()) {
            if (this._hp.hitBy(damage) <= 0) {
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
    p.paint = function () {
        _super.prototype.paint.call(this);
        if (this._hp) {
            this._hp.paint();
        }
    };
    p._face = function (npc) {
        this._turn(this._direction8(npc.x, npc.y));
    };
    return NPC;
}(MovableEntity));
egret.registerClass(NPC,'NPC');
//# sourceMappingURL=NPC.js.map