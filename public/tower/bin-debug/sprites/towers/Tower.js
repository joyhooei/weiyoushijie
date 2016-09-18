var Tower = (function (_super) {
    __extends(Tower, _super);
    function Tower() {
        _super.call(this);
        this.width = this.height = 50;
        this._displays.addClip("building");
    }
    var d = __define,c=Tower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hitSpeed = this._get(properties, "hitSpeed", 60);
        this._buildTicks = this._get(properties, "buildTicks", 100);
        this._buyPrice = this._get(properties, "buyPrice", 100);
        this._sellPrice = this._get(properties, "sellPrice", 100);
        this._guardRadius = this._get(properties, "guardRadius", 10);
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
        application.battle.incGolds(this._sellPrice);
    };
    p._idle = function () {
        this.build();
        application.battle.incGolds(-this._buyPrice);
    };
    p._building = function () {
        this._ticks++;
        if (this._ticks > this._buildTicks) {
            this.guard();
        }
    };
    return Tower;
}(Entity));
egret.registerClass(Tower,'Tower');
//# sourceMappingURL=Tower.js.map