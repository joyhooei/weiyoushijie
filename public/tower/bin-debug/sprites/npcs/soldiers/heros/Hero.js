var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.call(this);
    }
    var d = __define,c=Hero,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._forceHigh = this._get(properties, "forceHigh", 10);
        this._forceLow = this._get(properties, "forceLow", 6);
        this._force = 0;
    };
    p.setLegend = function (legend) {
        this._legend = legend;
    };
    p.getForce = function () {
        return this._forceLow + Math.round(Math.random() * (this._forceHigh - this._forceLow)) + this._force;
    };
    return Hero;
}(Soldier));
egret.registerClass(Hero,'Hero');
//# sourceMappingURL=Hero.js.map