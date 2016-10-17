var BombTower1 = (function (_super) {
    __extends(BombTower1, _super);
    function BombTower1() {
        _super.call(this);
        this._bulletClaz = "Bomb1";
        this.addBitmap("bombtower1_png");
    }
    var d = __define,c=BombTower1,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 23;
    };
    p.getMuzzleY = function () {
        return this.y + 9;
    };
    return BombTower1;
}(BombTower));
egret.registerClass(BombTower1,'BombTower1');
//# sourceMappingURL=BombTower1.js.map