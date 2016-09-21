var ArrowTower = (function (_super) {
    __extends(ArrowTower, _super);
    function ArrowTower() {
        _super.call(this);
    }
    var d = __define,c=ArrowTower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._soldiers = [];
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
        for (var i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].erase();
        }
        this._soldiers = [];
    };
    p.guard = function () {
        _super.prototype.guard.call(this);
        this._addSoldier(this._soldierClaz, this.x + 36, this.y + 15);
        this._addSoldier(this._soldierClaz, this.x + 50, this.y + 15);
    };
    p._addSoldier = function (claz, x, y) {
        var soldier = application.pool.get(claz, { guardX: x, guardY: y, guardRadius: this._guardRadius });
        soldier.setCenterX(x);
        soldier.setBottomY(y);
        this._soldiers.push(soldier);
        application.battle.addEntity(soldier);
    };
    return ArrowTower;
}(Tower));
egret.registerClass(ArrowTower,'ArrowTower');
//# sourceMappingURL=ArrowTower.js.map