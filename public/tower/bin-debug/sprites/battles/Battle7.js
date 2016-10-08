//白骨精
var Battle7 = (function (_super) {
    __extends(Battle7, _super);
    function Battle7() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle7,p=c.prototype;
    //增加英雄
    p._addHeros = function () {
        this._addHerosByName("Sunwukong");
    };
    p._addEffects = function () {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    };
    p._addWaves = function (paths) {
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
    return Battle7;
}(Battle));
egret.registerClass(Battle7,'Battle7');
//# sourceMappingURL=Battle7.js.map