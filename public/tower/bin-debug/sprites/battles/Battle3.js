//黄风怪
var Battle3 = (function (_super) {
    __extends(Battle3, _super);
    function Battle3() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle3,p=c.prototype;
    //增加英雄
    p._addHeros = function () {
        this._addHerosByName("Sunwukong");
    };
    //增加塔基
    p._addBases = function () {
        this._addBasesByName("Base3");
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
    return Battle3;
}(Battle));
egret.registerClass(Battle3,'Battle3');
//# sourceMappingURL=Battle3.js.map