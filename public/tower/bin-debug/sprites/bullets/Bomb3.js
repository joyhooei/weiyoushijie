var Bomb3 = (function (_super) {
    __extends(Bomb3, _super);
    function Bomb3() {
        _super.call(this);
        this.addBitmap("bomb3_moving_png", "east-moving")
            .addClip("bomb_fighting", "east-fighting")
            .addBitmap("bomb3_dying_png", "east-dying");
    }
    var d = __define,c=Bomb3,p=c.prototype;
    p._fighting = function () {
        this._ticks++;
        if (this._ticks >= this._fightingTicks) {
            this.kill();
        }
    };
    return Bomb3;
}(Bomb));
egret.registerClass(Bomb3,'Bomb3');
//# sourceMappingURL=Bomb3.js.map