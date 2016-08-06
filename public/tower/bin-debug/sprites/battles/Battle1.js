var Battle1 = (function (_super) {
    __extends(Battle1, _super);
    function Battle1() {
        _super.call(this);
    }
    var d = __define,c=Battle1,p=c.prototype;
    //增加塔基放置点
    p.addBases = function () {
        var x = [100];
        var y = [100];
        for (var i = 0; i < x.length; i++) {
            var entity = application.pool.get("Base");
            this._addBase(x[i], y[i], entity);
        }
    };
    //增加英雄
    p.addHero = function () {
        this._setHero(100, 200, application.pool.get("Hero"));
    };
    //增加敌人
    p.launch = function (wave) {
        var enemy = application.pool.get("Enemy");
        this.addEnemies(-10, 200, [enemy]);
    };
    return Battle1;
}(Battle));
egret.registerClass(Battle1,'Battle1');
//# sourceMappingURL=Battle1.js.map