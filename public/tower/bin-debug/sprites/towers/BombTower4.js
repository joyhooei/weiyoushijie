var BombTower4 = (function (_super) {
    __extends(BombTower4, _super);
    function BombTower4() {
        _super.call(this);
        this._bulletClaz = "Bomb1";
        this.addBitmap("bombtower4_png");
    }
    var d = __define,c=BombTower4,p=c.prototype;
    p.getMuzzleX = function () {
        return this.x + 33;
    };
    p.getMuzzleY = function () {
        return this.y + 7;
    };
    return BombTower4;
}(BombTower));
egret.registerClass(BombTower4,'BombTower4');
//# sourceMappingURL=BombTower4.js.map