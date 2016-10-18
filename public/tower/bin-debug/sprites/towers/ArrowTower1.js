var ArrowTower1 = (function (_super) {
    __extends(ArrowTower1, _super);
    function ArrowTower1() {
        _super.call(this);
        this.addBitmap("arrowtower1_png");
        this._bulletClaz = "Arrow1";
    }
    var d = __define,c=ArrowTower1,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 25 + 15;
    };
    p.getMuzzleY = function () {
        return this.y + 7;
    };
    return ArrowTower1;
}(ArrowTower));
egret.registerClass(ArrowTower1,'ArrowTower1');
//# sourceMappingURL=ArrowTower1.js.map