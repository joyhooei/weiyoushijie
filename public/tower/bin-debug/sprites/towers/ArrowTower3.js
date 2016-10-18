var ArrowTower3 = (function (_super) {
    __extends(ArrowTower3, _super);
    function ArrowTower3() {
        _super.call(this);
        this.addBitmap("arrowtower3_png");
        this._bulletClaz = "Arrow1";
    }
    var d = __define,c=ArrowTower3,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 35 + 15;
    };
    p.getMuzzleY = function () {
        return this.y + 0;
    };
    return ArrowTower3;
}(ArrowTower));
egret.registerClass(ArrowTower3,'ArrowTower3');
//# sourceMappingURL=ArrowTower3.js.map