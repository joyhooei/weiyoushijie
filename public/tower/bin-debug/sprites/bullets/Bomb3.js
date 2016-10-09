var Bomb3 = (function (_super) {
    __extends(Bomb3, _super);
    function Bomb3() {
        _super.call(this);
        this.addBitmap("bomb3_moving_png", ["south-moving", "east-moving", "west-moving", "north-moving"])
            .addClip("bomb_dying", ["south-fighting", "east-fighting", "west-fighting", "north-fighting"])
            .addBitmap("bomb3_dying_png", "dying");
    }
    var d = __define,c=Bomb3,p=c.prototype;
    p._dying = function () {
        if (this._ticks >= (application.frameRate << 1)) {
            this.erase();
        }
        else {
            this._ticks++;
        }
    };
    return Bomb3;
}(Bomb));
egret.registerClass(Bomb3,'Bomb3');
//# sourceMappingURL=Bomb3.js.map