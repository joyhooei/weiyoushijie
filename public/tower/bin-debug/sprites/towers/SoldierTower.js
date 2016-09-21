var SoldierTower = (function (_super) {
    __extends(SoldierTower, _super);
    function SoldierTower() {
        _super.call(this);
    }
    var d = __define,c=SoldierTower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._guardX = this._get(properties, "guardX", 10);
        this._guardY = this._get(properties, "guardY", 10);
    };
    p.createSoldier = function (soldier) {
        soldier.relive(10 * application.frameRate);
        this._addSoldier(soldier);
        return soldier;
    };
    p.guard = function () {
        _super.prototype.guard.call(this);
        this._createSoldier(this._soldierClaz, { guardX: this._guardX + 10, guardY: this._guardY + 10, idleTicks: 0 });
        this._createSoldier(this._soldierClaz, { guardX: this._guardX - 10, guardY: this._guardY + 10, idleTicks: application.frameRate });
        this._createSoldier(this._soldierClaz, { guardX: this._guardX + 10, guardY: this._guardY - 10, idleTicks: 2 * application.frameRate });
    };
    p._createSoldier = function (claz, options) {
        this._addSoldier(application.pool.get(claz, options));
    };
    p._addSoldier = function (s) {
        s.setCreator(this);
        s.setCenterX(this.getCenterX());
        s.setBottomY(this.getBottomY());
        application.battle.addSoldier(s);
    };
    return SoldierTower;
}(Tower));
egret.registerClass(SoldierTower,'SoldierTower',["SoldierCreator"]);
//# sourceMappingURL=SoldierTower.js.map