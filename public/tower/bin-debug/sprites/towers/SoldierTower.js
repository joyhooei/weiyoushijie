var SoldierTower = (function (_super) {
    __extends(SoldierTower, _super);
    function SoldierTower() {
        _super.call(this);
    }
    var d = __define,c=SoldierTower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
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
        var s = soldier.relive(application.frameRate << 2);
        this._addSoldier(s);
        return s;
    };
    p.guard = function () {
        _super.prototype.guard.call(this);
        var delta = 15;
        this._createSoldier(this._soldierClaz, { forceHigh: this._forceHigh, forceLow: this._forceLow, guardX: this._guardX + delta, guardY: this._guardY + delta, idleTicks: 0 });
        this._createSoldier(this._soldierClaz, { forceHigh: this._forceHigh, forceLow: this._forceLow, guardX: this._guardX - delta, guardY: this._guardY + delta, idleTicks: application.frameRate });
        this._createSoldier(this._soldierClaz, { forceHigh: this._forceHigh, forceLow: this._forceLow, guardX: this._guardX + delta, guardY: this._guardY - delta, idleTicks: 2 * application.frameRate });
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
        s.setCenterX(this.getMuzzleX());
        s.setCenterY(this.getMuzzleY());
        s.setCreator(this);
        application.battle.addSoldier(s);
    };
    p.getMuzzleX = function () {
        var direction = this._direction4(this._guardX, this._guardY);
        switch (direction) {
            case EntityDirection.east:
                return this.x + this.width;
            case EntityDirection.west:
                return this.x;
            case EntityDirection.north:
            case EntityDirection.south:
                return this.x + (this.width >> 1);
        }
    };
    p.getMuzzleY = function () {
        var direction = this._direction4(this._guardX, this._guardY);
        switch (direction) {
            case EntityDirection.east:
            case EntityDirection.west:
                return this.y + (this.height >> 1);
            case EntityDirection.north:
                return this.y;
            case EntityDirection.south:
                return this.y + this.height;
        }
    };
    return SoldierTower;
}(Tower));
egret.registerClass(SoldierTower,'SoldierTower',["SoldierCreator"]);
//# sourceMappingURL=SoldierTower.js.map