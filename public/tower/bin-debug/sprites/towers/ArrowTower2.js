var ArrowTower2 = (function (_super) {
    __extends(ArrowTower2, _super);
    function ArrowTower2() {
        _super.call(this);
        this.addBitmap("arrowtower2_png");
        this._bulletClaz = "Arrow1";
    }
    var d = __define,c=ArrowTower2,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 25 + 15;
    };
    p.getMuzzleY = function () {
        return this.y + 7;
    };
    return ArrowTower2;
}(ArrowTower));
egret.registerClass(ArrowTower2,'ArrowTower2');
//# sourceMappingURL=ArrowTower2.js.map