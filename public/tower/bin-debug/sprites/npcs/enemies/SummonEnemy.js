var SummonEnemy = (function (_super) {
    __extends(SummonEnemy, _super);
    function SummonEnemy() {
        _super.apply(this, arguments);
    }
    var d = __define,c=SummonEnemy,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._summonTicks = this._get(properties, "summonTicks", 5 * application.frameRate);
        this._summonClaz = this._get(properties, "summonClaz", "Enemy27");
    };
    p._moving = function () {
        _super.prototype._moving.call(this);
        this._ticks++;
        if (this._ticks % this._summonTicks == 0) {
            this._summon(this._summonClaz);
        }
    };
    p._summon = function (claz) {
        return this._born(claz, this.x, this.y);
    };
    return SummonEnemy;
}(Enemy));
egret.registerClass(SummonEnemy,'SummonEnemy');
//# sourceMappingURL=SummonEnemy.js.map