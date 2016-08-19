var Tip = (function (_super) {
    __extends(Tip, _super);
    function Tip() {
        _super.call(this);
        this.kill();
    }
    var d = __define,c=Tip,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._dyingTicks = this._get(properties, "dyingTicks", 1000);
    };
    p._dying = function () {
        if (this._ticks > this._dyingTicks) {
            this.erase();
        }
    };
    return Tip;
}(Entity));
egret.registerClass(Tip,'Tip');
//# sourceMappingURL=Tip.js.map