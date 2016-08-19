var RemoteHitTower = (function (_super) {
    __extends(RemoteHitTower, _super);
    function RemoteHitTower() {
        _super.call(this);
    }
    var d = __define,c=RemoteHitTower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._bulletName = this._get(properties, "bulletName", "Bomb");
        this._enemy = null;
    };
    p._guarding = function () {
        if (this._ticks % this._hitSpeed == 0) {
            if (this._enemy == null
                || !this._enemy.active()
                || !this._enemy.within(this.parent.x, this.parent.y, this._guardRadius)) {
                this._enemy = application.battle.findEnemy(this.parent.x, this.parent.y, this._guardRadius, [0]);
            }
            if (this._enemy) {
                Bullet.shootAtNPC(this.getCenterX(), this.getCenterY(), this._enemy, this._bulletName);
            }
        }
    };
    return RemoteHitTower;
}(Tower));
egret.registerClass(RemoteHitTower,'RemoteHitTower');
//# sourceMappingURL=RemoteHitTower.js.map