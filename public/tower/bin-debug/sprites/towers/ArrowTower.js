var ArrowTower = (function (_super) {
    __extends(ArrowTower, _super);
    function ArrowTower() {
        _super.apply(this, arguments);
    }
    var d = __define,c=ArrowTower,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        if (this._skill) {
            if (this._skill.attrs.level == 1) {
                this._guardRadius = Math.round(1.05 * this._guardRadius);
            }
            if (this._skill.attrs.level == 3) {
                this._forceHigh = Math.round(1.05 * this._forceHigh);
                this._forceLow = Math.round(1.05 * this._forceLow);
            }
            if (this._skill.attrs.level == 4) {
                this._guardRadius = Math.round(1.05 * this._guardRadius);
                this._forceHigh = Math.round(1.05 * this._forceHigh);
                this._forceLow = Math.round(1.05 * this._forceLow);
            }
            if (this._skill.attrs.level == 6) {
                this._forceHigh = Math.round(1.1 * this._forceHigh);
                this._forceLow = Math.round(1.1 * this._forceLow);
            }
        }
    };
    p._findEnemy = function () {
        return application.battle.findEnemy(this.getCenterX(), this.getCenterY(), this._guardRadius, [0, 1]);
    };
    return ArrowTower;
}(ShootTower));
egret.registerClass(ArrowTower,'ArrowTower');
//# sourceMappingURL=ArrowTower.js.map