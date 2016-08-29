var Soldier1 = (function (_super) {
    __extends(Soldier1, _super);
    function Soldier1() {
        _super.call(this);
        this._displays.addClip("soldier1");
    }
    var d = __define,c=Soldier1,p=c.prototype;
    p.paint = function () {
        var display = this._displays.render(this, this._direction, this._state);
        if (display && this._hp) {
            display.y = -10;
            display.x = -26;
            display.height = this.height - 3;
        }
    };
    return Soldier1;
}(Soldier));
egret.registerClass(Soldier1,'Soldier1');
//# sourceMappingURL=Soldier1.js.map