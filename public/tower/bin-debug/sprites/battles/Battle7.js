//白骨精
var Battle7 = (function (_super) {
    __extends(Battle7, _super);
    function Battle7() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle7,p=c.prototype;
    p._addEffects = function () {
        this._addEffectByName("River", 0, 290, EntityDirection.east);
        this._addEffectByName("Cock", 120, 70, EntityDirection.east);
        this._addEffectByName("Cock", 540, 400, EntityDirection.west);
    };
    p._addWaves = function () {
    };
    return Battle7;
}(Battle));
egret.registerClass(Battle7,'Battle7');
//# sourceMappingURL=Battle7.js.map