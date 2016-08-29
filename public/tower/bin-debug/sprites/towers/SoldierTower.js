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
        var s = soldier.relive(10000);
        s.x = this.getCenterX();
        s.y = this.getCenterY();
        application.battle.addSoldier(s);
        return s;
    };
    p.guard = function () {
        for (var i = 0; i < 3; i++) {
            var soldier = application.pool.get("Soldier", { "guardX": this._guardX, "guardY": this._guardY });
            soldier.setCreator(this);
            soldier.x = this.getCenterX();
            soldier.y = this.getCenterY();
            application.battle.addSoldier(soldier);
        }
        _super.prototype.guard.call(this);
    };
    return SoldierTower;
}(Tower));
egret.registerClass(SoldierTower,'SoldierTower');
//# sourceMappingURL=SoldierTower.js.map