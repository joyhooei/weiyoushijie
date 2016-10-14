var BombTower = (function (_super) {
    __extends(BombTower, _super);
    function BombTower() {
        _super.apply(this, arguments);
    }
    var d = __define,c=BombTower,p=c.prototype;
    p.getMuzzleX = function () {
        return this.getCenterX() - 8;
    };
    return BombTower;
}(ShootTower));
egret.registerClass(BombTower,'BombTower');
//# sourceMappingURL=BombTower.js.map