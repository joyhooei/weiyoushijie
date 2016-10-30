var ArrowTower5 = (function (_super) {
    __extends(ArrowTower5, _super);
    function ArrowTower5() {
        _super.call(this);
        this.addBitmap("arrowtower5_png");
        this._bulletClaz = "Arrow5";
    }
    var d = __define,c=ArrowTower5,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 35 + 15;
    };
    p.getMuzzleY = function () {
        return this.y + 0;
    };
    p.upgradable = function () {
        return false;
    };
    return ArrowTower5;
}(ArrowTower));
egret.registerClass(ArrowTower5,'ArrowTower5');
//# sourceMappingURL=ArrowTower5.js.map