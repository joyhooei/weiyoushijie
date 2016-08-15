var BombTower = (function (_super) {
    __extends(BombTower, _super);
    function BombTower() {
        _super.call(this);
    }
    var d = __define,c=BombTower,p=c.prototype;
    p._createBullet = function () {
        return application.pool.get("Bomb");
    };
    return BombTower;
}(RemoteHitTower));
egret.registerClass(BombTower,'BombTower');
//# sourceMappingURL=BombTower.js.map