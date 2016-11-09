var MagicTower = (function (_super) {
    __extends(MagicTower, _super);
    function MagicTower() {
        _super.apply(this, arguments);
    }
    var d = __define,c=MagicTower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        if (this._skill) {
            if (this._skill.attrs.level == 5) {
                this._guardRadius = Math.round(this._guardRadius * 1.05);
            }
        }
    };
    p.getForce = function () {
        var force = _super.prototype.getForce.call(this);
        if (this._skill && this._skill.attrs.level == 1) {
            var towers = application.battle.getMagicTowers();
            force += Math.round(force * 0.02 * towers.length);
        }
        return force;
    };
    return MagicTower;
}(ShootTower));
egret.registerClass(MagicTower,'MagicTower');
//# sourceMappingURL=MagicTower.js.map