var MagicTower1 = (function (_super) {
    __extends(MagicTower1, _super);
    function MagicTower1() {
        _super.call(this);
        this.addBitmap("magictower1_png");
        this._bulletClaz = "Magic1";
    }
    var d = __define,c=MagicTower1,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 36;
    };
    p.getMuzzleY = function () {
        return this.y + 0;
    };
    return MagicTower1;
}(MagicTower));
egret.registerClass(MagicTower1,'MagicTower1');
//# sourceMappingURL=MagicTower1.js.map