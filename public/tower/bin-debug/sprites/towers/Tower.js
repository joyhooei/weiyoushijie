var Tower = (function (_super) {
    __extends(Tower, _super);
    function Tower() {
        _super.call(this);
        /**射程范围最大半径*/
        this._maxRadius = 140;
        this._enemy = null;
        this._fireSpeed = 5;
        this._lastFireTicks = 0;
        this._maxRadius = 50;
    }
    var d = __define,c=Tower,p=c.prototype;
    p._idle = function () {
        this._do(EntityState.building);
    };
    p._building = function () {
        if (this._ticks > 100) {
            this._do(EntityState.fighting);
        }
    };
    p._fighting = function () {
        if (!this._enemy || this._enemy.dead() || !this._enemy.intersect(this.x, this.y, this._maxRadius)) {
            this._enemy = application.battle.findEnemy(this.x, this.y, this._maxRadius);
        }
        if (this._enemy) {
            if (this._ticks - this._lastFireTicks >= this._fireSpeed) {
                this._fire(this._enemy);
                this._lastFireTicks = this._ticks;
            }
        }
    };
    p._fire = function (enemy) {
    };
    return Tower;
}(Entity));
egret.registerClass(Tower,'Tower');
//# sourceMappingURL=Tower.js.map