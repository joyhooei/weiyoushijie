//雷音寺
var Battle15 = (function (_super) {
    __extends(Battle15, _super);
    function Battle15() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle15,p=c.prototype;
    p._addEffects = function () {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    };
    p._addWaves = function () {
    };
    return Battle15;
}(Battle));
egret.registerClass(Battle15,'Battle15');
//# sourceMappingURL=Battle15.js.map