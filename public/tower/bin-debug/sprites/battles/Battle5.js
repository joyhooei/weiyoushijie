//流沙河（获得hero——沙僧）
var Battle5 = (function (_super) {
    __extends(Battle5, _super);
    function Battle5() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle5,p=c.prototype;
    //增加塔基
    p._addBases = function () {
        this._addBasesByName("Base5");
    };
    p._addEffects = function () {
        this._addEffectByName("Frog", 200, 200, EntityDirection.west);
        this._lawn = this._addEffectByName("Lawn", 200, 200, EntityDirection.west);
    };
    p._addWaves = function () {
        this._addWave(0, "Enemy4", 1, 0);
        this._addWave(1, "Enemy4", 1, 1);
    };
    p._addBoss = function () {
        var self = this;
        var boat = application.pool.get("Boat");
        boat.x = 240;
        boat.y = 400;
        boat.setCallback(function (entity) {
            self._addBossByName(self._boss, 0);
            self._lawn.kill();
        });
        self.addEntity(boat);
    };
    return Battle5;
}(Battle));
egret.registerClass(Battle5,'Battle5');
//# sourceMappingURL=Battle5.js.map