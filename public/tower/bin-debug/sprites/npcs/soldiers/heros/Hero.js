var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Hero,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._extraForce = 0;
        this._curSkill = 0;
    };
    p.getForce = function () {
        return _super.prototype.getForce.call(this) + this._extraForce;
    };
    p._render = function (xDelta, yDelta, idx) {
        if (xDelta === void 0) { xDelta = 0; }
        if (yDelta === void 0) { yDelta = 0; }
        if (idx === void 0) { idx = 0; }
        this._centerHp();
        return _super.prototype._render.call(this, 0, 5, this._curSkill);
    };
    return Hero;
}(Soldier));
egret.registerClass(Hero,'Hero');
//# sourceMappingURL=Hero.js.map