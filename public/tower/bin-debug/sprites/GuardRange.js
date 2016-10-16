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
        var width = this._guardRadius << 1;
        var height = (this._guardRadius / Math.sqrt(2)) << 1;
        var x = 0;
        var y = (width - height) >> 1;
        this.graphics.beginFill(0x009900, 0.2);
        this.graphics.drawEllipse(x, y, width, height);
        this.graphics.endFill();
        this.graphics.lineStyle(1, 0x990000);
        this.graphics.drawEllipse(x, y, width, height);
        this.graphics.endFill();
    };
    return GuardRange;
}(Entity));
egret.registerClass(GuardRange,'GuardRange');
//# sourceMappingURL=GuardRange.js.map