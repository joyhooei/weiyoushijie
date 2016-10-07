//火焰山
var Battle11 = (function (_super) {
    __extends(Battle11, _super);
    function Battle11() {
        _super.call(this);
        this._url = "resource/art/sprites/battles/battle1.tmx";
    }
    var d = __define,c=Battle11,p=c.prototype;
    p._addBases = function () {
        this._addBasesByName("Base1");
    };
    //增加英雄
    p._addHeros = function () {
        this._addHerosByName("Sunwukong");
    };
    p._addEffects = function () {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    };
    p._addStandbys = function () {
        var paths = this._map.getPaths();
        var waves = [
            [0, "Wolf", 1, 0],
            [1, "Wolf", 10, 1],
            [2, "Hogs", 10, 0],
            [3, "Rhino", 10, 1],
            [4, "Wolf", 10, 0],
            [4, "Wolf", 10, 1],
        ];
        for (var i = 0; i < waves.length; i++) {
            var w = waves[i];
            this._waves.add(w[0], w[1], w[2], paths[w[3]]);
        }
    };
    return Battle11;
}(Battle));
egret.registerClass(Battle11,'Battle11');
//# sourceMappingURL=Battle11.js.map