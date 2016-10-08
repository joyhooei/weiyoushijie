//长安市郊（初始获得hero——孙悟空）
var Battle1 = (function (_super) {
    __extends(Battle1, _super);
    function Battle1() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Battle1,p=c.prototype;
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
    return Battle1;
}(Battle));
egret.registerClass(Battle1,'Battle1');
//# sourceMappingURL=Battle1.js.map