//车迟国
var Battle6 = (function (_super) {
    __extends(Battle6, _super);
    function Battle6() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle6,p=c.prototype;
    p._addEffects = function () {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    };
    p._addWaves = function () {
    };
    return Battle6;
}(Battle));
egret.registerClass(Battle6,'Battle6');
//# sourceMappingURL=Battle6.js.map