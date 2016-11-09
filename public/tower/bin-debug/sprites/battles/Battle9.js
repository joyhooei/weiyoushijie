//平顶山
var Battle9 = (function (_super) {
    __extends(Battle9, _super);
    function Battle9() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle9,p=c.prototype;
    p._addEffects = function () {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    };
    p._addWaves = function () {
    };
    return Battle9;
}(Battle));
egret.registerClass(Battle9,'Battle9');
//# sourceMappingURL=Battle9.js.map