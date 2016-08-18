var SoliderTower = (function (_super) {
    __extends(SoliderTower, _super);
    function SoliderTower() {
        _super.call(this);
    }
    var d = __define,c=SoliderTower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._guardX = this._get(properties, "guardX", 10);
        this._guardY = this._get(properties, "guardY", 10);
        this._totalSoliders = 0;
    };
    p.addSolider = function () {
        var solider = application.pool.get("Solider", { "guardX": this._guardX, "guardY": this._guardY });
        application.battle.addSoldier(solider);
        this._totalSoliders++;
    };
    p.childDead = function (child) {
        this._totalSoliders--;
    };
    p._stateChanged = function (oldState, newState) {
        if (newState == EntityState.guarding) {
            this.addSolider();
            this.addSolider();
            this.addSolider();
        }
    };
    p._guarding = function () {
        if (this._ticks % this._hitSpeed == 0 && this._totalSoliders < 3) {
            this.addSolider();
        }
    };
    return SoliderTower;
}(Tower));
egret.registerClass(SoliderTower,'SoliderTower');
//# sourceMappingURL=SoliderTower.js.map