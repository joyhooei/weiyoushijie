var MagicTower2 = (function (_super) {
    __extends(MagicTower2, _super);
    function MagicTower2() {
        _super.call(this);
        this.addBitmap("magictower2_png");
        this._bulletClaz = "Magic2";
    }
    var d = __define,c=MagicTower2,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 35;
    };
    p.getMuzzleY = function () {
        return this.y + 15;
    };
    return MagicTower2;
}(MagicTower));
egret.registerClass(MagicTower2,'MagicTower2');
//# sourceMappingURL=MagicTower2.js.map