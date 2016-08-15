var Tower = (function (_super) {
    __extends(Tower, _super);
    function Tower() {
        _super.call(this);
    }
    var d = __define,c=Tower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._hitSpeed = this._get(properties, "hitSpeed", 60);
        this._buildTicks = this._get(properties, "buildTicks", 100);
        this._buyPrice = this._get(properties, "buyPrice", 100);
        this._sellPrice = this._get(properties, "sellPrice", 100);
        this._guardRadius = this._get(properties, "guardRadius", 10);
    };
    p._stateChanged = function (oldState, newState) {
        if (newState == EntityState.building) {
            application.battle.incGolds(-this._buyPrice);
        }
        else if (newState == EntityState.dying) {
            application.battle.incGolds(this._sellPrice);
        }
        else if (newState == EntityState.dead) {
            application.pool.set(this);
        }
        _super.prototype._stateChanged.call(this, oldState, newState);
    };
    p._idle = function () {
        this.build();
    };
    p._building = function () {
        if (this._ticks > this._buildTicks) {
            this.guard();
        }
    };
    return Tower;
}(Entity));
egret.registerClass(Tower,'Tower');
//# sourceMappingURL=Tower.js.map