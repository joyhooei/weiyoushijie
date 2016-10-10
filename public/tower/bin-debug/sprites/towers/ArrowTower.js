var ArrowTower = (function (_super) {
    __extends(ArrowTower, _super);
    function ArrowTower() {
        _super.call(this);
    }
    var d = __define,c=ArrowTower,p=c.prototype;
    p.guard = function () {
        _super.prototype.guard.call(this);
        var x = this.getCenterX();
        var y = this.y + 35;
        this._addSoldier(x, y);
    };
    return ArrowTower;
}(ShootTower));
egret.registerClass(ArrowTower,'ArrowTower');
//# sourceMappingURL=ArrowTower.js.map