var ArrowTower4 = (function (_super) {
    __extends(ArrowTower4, _super);
    function ArrowTower4() {
        _super.call(this);
        this.addBitmap("arrowtower4_png");
        this._bulletClaz = "Arrow1";
    }
    var d = __define,c=ArrowTower4,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 35 + 15;
    };
    p.getMuzzleY = function () {
        return this.y + 0;
    };
    return ArrowTower4;
}(ArrowTower));
egret.registerClass(ArrowTower4,'ArrowTower4');
//# sourceMappingURL=ArrowTower4.js.map