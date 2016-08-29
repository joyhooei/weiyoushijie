var Enemy1 = (function (_super) {
    __extends(Enemy1, _super);
    function Enemy1() {
        _super.call(this);
        this._displays.addClip("enemy1");
    }
    var d = __define,c=Enemy1,p=c.prototype;
    p.paint = function () {
        var display = this._displays.render(this, this._direction, this._state);
        if (display && this._hp) {
            display.y = 3;
            display.x = -10;
            display.height = this.height - 3;
        }
    };
    return Enemy1;
}(Enemy));
egret.registerClass(Enemy1,'Enemy1');
//# sourceMappingURL=Enemy1.js.map