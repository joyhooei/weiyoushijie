var ArrowTower = (function (_super) {
    __extends(ArrowTower, _super);
    function ArrowTower() {
        _super.apply(this, arguments);
    }
    var d = __define,c=ArrowTower,p=c.prototype;
    p.getMuzzleX = function () {
        return this.getCenterX();
    };
    return ArrowTower;
}(ShootTower));
egret.registerClass(ArrowTower,'ArrowTower');
//# sourceMappingURL=ArrowTower.js.map