var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC() {
        _super.call(this);
        this._hp = new Hp();
        this._hp.width = 18;
        this.addChild(this._hp);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hp.initialize(properties);
        this._damage = this._get(properties, "damage", 10);
        this._hitSpeed = this._get(properties, "hitSpeed", 10);
        this._altitude = this._get(properties, "altitude", 0);
        this._idleTicks = Math.random() * 100;
    };
    p.getAltitude = function () {
        return this._altitude;
    };
    p.kill = function () {
        this._hp.kill();
        this._do(EntityState.dying);
    };
    p.hitBy = function (damage) {
        if (this._hp.hitBy(damage) <= 0) {
            this._do(EntityState.dying);
            return true;
        }
        else {
            return false;
        }
    };
    p.paint = function () {
        _super.prototype.paint.call(this);
        this._hp.paint();
    };
    p._face = function (npc) {
        this._turn(this._direction8(npc.x, npc.y));
    };
    return NPC;
}(MovableEntity));
egret.registerClass(NPC,'NPC');
//# sourceMappingURL=NPC.js.map