var Enemy1 = (function (_super) {
    __extends(Enemy1, _super);
    function Enemy1() {
        _super.call(this);
        this._displays.addClip("enemy1");
    }
    var d = __define,c=Enemy1,p=c.prototype;
    p.paint = function () {
        this._display(-3, -10, this.width, this.height);
    };
    return Enemy1;
}(Enemy));
egret.registerClass(Enemy1,'Enemy1');
//# sourceMappingURL=Enemy1.js.map