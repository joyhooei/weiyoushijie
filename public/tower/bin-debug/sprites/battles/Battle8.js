//琵琶洞
var Battle8 = (function (_super) {
    __extends(Battle8, _super);
    function Battle8() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle8,p=c.prototype;
    //增加英雄
    p._addHeros = function () {
        this._addHerosByName("Sunwukong");
    };
    p._addEffects = function () {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    };
    p._addWaves = function () {
    };
    return Battle8;
}(Battle));
egret.registerClass(Battle8,'Battle8');
//# sourceMappingURL=Battle8.js.map