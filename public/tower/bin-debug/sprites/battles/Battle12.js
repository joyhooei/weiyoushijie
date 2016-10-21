//海底
var Battle12 = (function (_super) {
    __extends(Battle12, _super);
    function Battle12() {
        _super.call(this);
        this._width = 800;
        this._height = 640;
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
        this._addWave(0, "Wolf", 5, 0);
    };
    return Battle12;
}(Battle));
egret.registerClass(Battle12,'Battle12');
//# sourceMappingURL=Battle12.js.map