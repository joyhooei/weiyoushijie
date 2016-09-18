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
        return this._addSoldier(soldier.relive(10 * application.frameRate));
    };
    p.guard = function () {
        for (var i = 0; i <= 2; i++) {
            this._addSoldier(application.pool.get(this._soldierClaz, { guardX: this._guardX, guardY: this._guardY, idleTicks: i * application.frameRate }));
        }
        _super.prototype.guard.call(this);
    };
    p._addSoldier = function (s) {
        s.setCreator(this);
        s.setCenterX(this.getCenterX());
        s.setBottomY(this.getBottomY());
        application.battle.addSoldier(s);
        return s;
    };
    return SoldierTower;
}(Tower));
egret.registerClass(SoldierTower,'SoldierTower',["SoldierCreator"]);
//# sourceMappingURL=SoldierTower.js.map