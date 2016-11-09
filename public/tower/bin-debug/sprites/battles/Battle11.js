//火焰山
var Battle11 = (function (_super) {
    __extends(Battle11, _super);
    function Battle11() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle11,p=c.prototype;
    p._addEffects = function () {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    };
    p._addWaves = function () {
    };
    return Battle11;
}(Battle));
egret.registerClass(Battle11,'Battle11');
//# sourceMappingURL=Battle11.js.map