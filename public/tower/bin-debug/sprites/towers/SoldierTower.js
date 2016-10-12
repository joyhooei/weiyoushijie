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
        this._soldiers = [];
    };
    p.getGuardX = function () {
        return this._guardX;
    };
    p.getGuardY = function () {
        return this._guardY;
    };
    p.showFlag = function () {
        this._range = application.pool.get("GuardRange", { guardRadius: this._guardRadius });
        this._range.x = this.getCenterX() - this._guardRadius;
        this._range.y = this.getCenterY() - this._guardRadius;
        this._range.width = this._guardRadius << 1;
        this._range.height = this._guardRadius << 1;
        application.battle.addEntity(this._range);
        this._flag = application.pool.get("FlagTip");
        this._flag.setCenterX(this._guardX);
        this._flag.setCenterY(this._guardY);
        application.battle.addEntity(this._flag);
    };
    p.deselect = function () {
        _super.prototype.deselect.call(this);
        if (this._flag) {
            this._flag.erase();
            this._flag = null;
        }
    };
    p.createSoldier = function (soldier) {
        soldier.relive(10 * application.frameRate);
        this._addSoldier(soldier);
        return soldier;
    };
    p.guard = function () {
        _super.prototype.guard.call(this);
        var delta = 15;
        this._createSoldier(this._soldierClaz, { force: this._force, guardX: this._guardX + delta, guardY: this._guardY + delta, idleTicks: 0 });
        this._createSoldier(this._soldierClaz, { force: this._force, guardX: this._guardX - delta, guardY: this._guardY + delta, idleTicks: application.frameRate });
        this._createSoldier(this._soldierClaz, { force: this._force, guardX: this._guardX + delta, guardY: this._guardY - delta, idleTicks: 2 * application.frameRate });
    };
    p.guardAt = function (x, y) {
        if (this.within(x, y, this._guardRadius)) {
            var deltaX = x - this._guardX;
            var deltaY = y - this._guardY;
            for (var i = 0; i < this._soldiers.length; i++) {
                this._soldiers[i].guardAt(this._soldiers[i].getGuardX() + deltaX, this._soldiers[i].getGuardY() + deltaY);
            }
            this._guardX = x;
            this._guardY = y;
            return true;
        }
        else {
            return false;
        }
    };
    p.erase = function () {
        for (var i = 0; i < this._soldiers.length; i++) {
            this._soldiers[i].setCreator(null);
            this._soldiers[i].erase();
        }
        this._soldiers = [];
        _super.prototype.erase.call(this);
    };
    p._createSoldier = function (claz, options) {
        this._addSoldier(application.pool.get(claz, options));
    };
    p._addSoldier = function (s) {
        var found = false;
        for (var i = 0; i < this._soldiers.length; i++) {
            if (this._soldiers[i] == s) {
                found = true;
            }
        }
        if (!found) {
            this._soldiers.push(s);
        }
        s.setCreator(this);
        s.setCenterX(this.getCenterX());
        s.setBottomY(this.getBottomY());
        application.battle.addSoldier(s);
    };
    return SoldierTower;
}(Tower));
egret.registerClass(SoldierTower,'SoldierTower',["SoldierCreator"]);
//# sourceMappingURL=SoldierTower.js.map