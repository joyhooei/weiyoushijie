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
        var x = 0;
        var y = Math.round(this._guardRadius * 0.3);
        var width = this._guardRadius << 1;
        var height = (this._guardRadius - y) << 1;
        this.graphics.beginFill(0x009900, 0.2);
        this.graphics.drawEllipse(x, y, width, height);
        this.graphics.endFill();
        this.graphics.lineStyle(3, 0x990000);
        this.graphics.drawEllipse(x, y, width, height);
        this.graphics.endFill();
    };
    return GuardRange;
}(Entity));
egret.registerClass(GuardRange,'GuardRange');
//# sourceMappingURL=GuardRange.js.map