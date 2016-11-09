//盘丝洞
var Battle10 = (function (_super) {
    __extends(Battle10, _super);
    function Battle10() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle10,p=c.prototype;
    p._addEffects = function () {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    };
    p._addWaves = function () {
    };
    return Battle10;
}(Battle));
egret.registerClass(Battle10,'Battle10');
//# sourceMappingURL=Battle10.js.map