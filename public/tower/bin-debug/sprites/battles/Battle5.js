//流沙河（获得hero——沙僧）
var Battle5 = (function (_super) {
    __extends(Battle5, _super);
    function Battle5() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle5,p=c.prototype;
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
    return Battle5;
}(Battle));
egret.registerClass(Battle5,'Battle5');
//# sourceMappingURL=Battle5.js.map