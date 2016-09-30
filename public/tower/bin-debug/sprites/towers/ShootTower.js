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
        var x = this.getCenterX() - 10;
        var y = this.y + 10;
        this._soldier = application.pool.get(this._soldierClaz, { guardRadius: this._guardRadius });
        this._soldier.setCenterX(x);
        this._soldier.setBottomY(y);
        application.battle.addEntity(this._soldier);
    };
    return ShootTower;
}(Tower));
egret.registerClass(ShootTower,'ShootTower');
//# sourceMappingURL=ShootTower.js.map