var Battle1 = (function (_super) {
    __extends(Battle1, _super);
    function Battle1() {
        _super.call(this);
        this._url = "resource/art/sprites/battles/level2.tmx";
    }
    var d = __define,c=Battle1,p=c.prototype;
    //增加英雄
    p._addHeros = function () {
        var pos = this._map.getHeros();
        for (var i = 0; i < pos.length; i++) {
            var hero = application.pool.get("MonkeyKing");
            hero.x = pos[i][0];
            hero.y = pos[i][1];
            this.addHero(hero);
        }
    };
    p._addStandbys = function () {
        var paths = this._map.getPaths();
        var waves = [
            [0, "Enemy", 10, 0],
            [1, "Enemy", 10, 1],
            [2, "Enemy", 10, 0],
            [2, "Enemy", 10, 1],
        ];
        for (var i = 0; i < waves.length; i++) {
            var w = waves[i];
            this._waves.add(w[0], w[1], w[2], paths[w[3]]);
        }
    };
    return Battle1;
}(Battle));
egret.registerClass(Battle1,'Battle1');
//# sourceMappingURL=Battle1.js.map