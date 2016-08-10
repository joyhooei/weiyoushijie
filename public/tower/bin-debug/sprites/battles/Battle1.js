var Battle1 = (function (_super) {
    __extends(Battle1, _super);
    function Battle1() {
        _super.call(this);
        this._hero = application.pool.get("Hero");
        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
        this._addWaveEnemy(0, 0, 0, "Enemy", 100, 10, 50);
    }
    var d = __define,c=Battle1,p=c.prototype;
    return Battle1;
}(Battle));
egret.registerClass(Battle1,'Battle1');
//# sourceMappingURL=Battle1.js.map