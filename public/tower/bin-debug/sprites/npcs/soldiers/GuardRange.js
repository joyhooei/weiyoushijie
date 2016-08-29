var GuardRange = (function (_super) {
    __extends(GuardRange, _super);
    function GuardRange() {
        _super.call(this);
    }
    var d = __define,c=GuardRange,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._guardRadius = this._get(properties, "guardRadius", 100);
    };
    p._idle = function () {
        this.move();
    };
    p.paint = function () {
        this.graphics.clear();
        this.graphics.lineStyle(1, 0x009900);
        this.graphics.drawEllipse(0, 0, this._guardRadius << 1, this._guardRadius << 1);
        this.graphics.endFill();
    };
    return GuardRange;
}(Entity));
egret.registerClass(GuardRange,'GuardRange');
//# sourceMappingURL=GuardRange.js.map