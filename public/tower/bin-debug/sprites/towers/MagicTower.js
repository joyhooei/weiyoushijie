var MagicTower = (function (_super) {
    __extends(MagicTower, _super);
    function MagicTower() {
        _super.call(this);
    }
    var d = __define,c=MagicTower,p=c.prototype;
    p._createBullet = function () {
        return application.pool.get("Magic");
    };
    return MagicTower;
}(RemoteHitTower));
egret.registerClass(MagicTower,'MagicTower');
//# sourceMappingURL=MagicTower.js.map