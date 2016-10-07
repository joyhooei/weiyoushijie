//黄风怪
var Battle3 = (function (_super) {
    __extends(Battle3, _super);
    function Battle3() {
        _super.call(this);
        this._url = "resource/art/sprites/battles/battle2.tmx";
    }
    var d = __define,c=Battle3,p=c.prototype;
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
    return Battle3;
}(Battle));
egret.registerClass(Battle3,'Battle3');
//# sourceMappingURL=Battle3.js.map