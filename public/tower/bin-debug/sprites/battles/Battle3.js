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
    p._addEffects = function () {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    };
    p._addWaves = function () {
    };
    return Battle3;
}(Battle));
egret.registerClass(Battle3,'Battle3');
//# sourceMappingURL=Battle3.js.map