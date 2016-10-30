//高老庄（获得hero——猪八戒）
var Battle2 = (function (_super) {
    __extends(Battle2, _super);
    function Battle2() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle2,p=c.prototype;
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
        this._addWave(0, "Enemy4", 5, 0);
        this._addWave(0, "Enemy4", 5, 0);
        this._addWave(0, "Enemy4", 10, 0);
        this._addWave(1, "Enemy4", 5, 1);
        this._addWave(1, "Enemy4", 10, 1);
        this._addWave(1, "Enemy4", 15, 1);
        this._addWave(2, "Enemy4", 4, 0);
        this._addWave(2, "Enemy14", 2, 0);
        this._addWave(2, "Enemy4", 4, 0);
        this._addWave(2, "Enemy14", 2, 0);
        this._addWave(2, "Enemy14", 4, 0);
        this._addWave(2, "Enemy4", 5, 1);
        this._addWave(2, "Enemy4", 5, 1);
        this._addWave(2, "Enemy4", 5, 1);
        this._addWave(3, "Enemy8", 3, 1);
        this._addWave(3, "Enemy8", 5, 1);
        this._addWave(3, "Enemy8", 6, 1);
        this._addWave(3, "Enemy8", 6, 1);
        this._addWave(3, "Enemy8", 8, 1);
        this._addWave(3, "Enemy8", 8, 1);
        this._addWave(4, "Enemy4", 2, 0);
        this._addWave(4, "Enemy14", 2, 0);
        this._addWave(4, "Enemy4", 2, 0);
        this._addWave(4, "Enemy14", 2, 0);
        this._addWave(4, "Enemy14", 5, 0);
        this._addWave(4, "Enemy8", 5, 1);
        this._addWave(4, "Enemy8", 5, 1);
        this._addWave(4, "Enemy8", 5, 1);
        this._addWave(4, "Enemy8", 5, 1);
        this._addWave(5, "Enemy14", 2, 0);
        this._addWave(5, "Enemy4", 3, 0);
        this._addWave(5, "Enemy14", 2, 0);
        this._addWave(5, "Enemy4", 9, 0);
        this._addWave(5, "Enemy4", 1, 0);
        this._addWave(5, "Enemy14", 1, 0);
        this._addWave(5, "Enemy14", 2, 1);
        this._addWave(5, "Enemy4", 3, 1);
        this._addWave(5, "Enemy14", 2, 1);
        this._addWave(5, "Enemy4", 9, 1);
        this._addWave(5, "Enemy4", 1, 1);
        this._addWave(5, "Enemy14", 1, 1);
        this._addWave(6, "Enemy8", 6, 0);
        this._addWave(6, "Enemy8", 6, 0);
        this._addWave(6, "Enemy8", 6, 0);
        this._addWave(6, "Enemy8", 6, 0);
        this._addWave(6, "Enemy8", 6, 0);
        this._addWave(6, "Enemy8", 6, 1);
        this._addWave(6, "Enemy8", 6, 1);
        this._addWave(6, "Enemy8", 6, 1);
        this._addWave(6, "Enemy8", 6, 1);
        this._addWave(6, "Enemy8", 6, 1);
        this._addWave(7, "Enemy8", 9, 0);
        this._addWave(7, "Enemy8", 6, 0);
        this._addWave(7, "Enemy8", 6, 0);
        this._addWave(7, "Enemy8", 6, 0);
        this._addWave(7, "Enemy8", 12, 0);
        this._addWave(7, "Enemy14", 5, 1);
        this._addWave(7, "Enemy14", 5, 1);
        this._addWave(7, "Enemy4", 10, 1);
    };
    return Battle2;
}(Battle));
egret.registerClass(Battle2,'Battle2');
//# sourceMappingURL=Battle2.js.map