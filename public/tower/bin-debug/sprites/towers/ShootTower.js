var ShootTower = (function (_super) {
    __extends(ShootTower, _super);
    function ShootTower() {
        _super.call(this);
    }
    var d = __define,c=ShootTower,p=c.prototype;
    p.erase = function () {
        _super.prototype.erase.call(this);
        if (this._soldier) {
            this._soldier.erase();
        }
        this._soldier = null;
    };
    p.guard = function () {
        _super.prototype.guard.call(this);
        this._soldier = application.pool.get(this._soldierClaz, { guardX: this.getCenterX(), guardY: this.getCenterY(), guardRadius: this._guardRadius });
        this._soldier.setCenterX(this.getCenterX());
        this._soldier.setBottomY(this.getCenterY());
        application.battle.addEntity(this._soldier);
    };
    return ShootTower;
}(Tower));
egret.registerClass(ShootTower,'ShootTower');
//# sourceMappingURL=ShootTower.js.map