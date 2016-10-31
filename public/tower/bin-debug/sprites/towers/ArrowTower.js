var ArrowTower = (function (_super) {
    __extends(ArrowTower, _super);
    function ArrowTower() {
        _super.apply(this, arguments);
    }
    var d = __define,c=ArrowTower,p=c.prototype;
    p._findEnemy = function () {
        return application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
    };
    return ArrowTower;
}(ShootTower));
egret.registerClass(ArrowTower,'ArrowTower');
//# sourceMappingURL=ArrowTower.js.map