//黑风山
var Battle4 = (function (_super) {
    __extends(Battle4, _super);
    function Battle4() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle4,p=c.prototype;
    //增加塔基
    p._addBases = function () {
        this._addBasesByName("Base4");
    };
    p._addEffects = function () {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    };
    p._addWaves = function () {
        this._addWave(0, "Enemy4", 1, 0);
        this._addWave(1, "Enemy4", 1, 1);
    };
    return Battle4;
}(Battle));
egret.registerClass(Battle4,'Battle4');
//# sourceMappingURL=Battle4.js.map