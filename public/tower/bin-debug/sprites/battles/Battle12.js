//海底
var Battle12 = (function (_super) {
    __extends(Battle12, _super);
    function Battle12() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle12,p=c.prototype;
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
    return Battle12;
}(Battle));
egret.registerClass(Battle12,'Battle12');
//# sourceMappingURL=Battle12.js.map