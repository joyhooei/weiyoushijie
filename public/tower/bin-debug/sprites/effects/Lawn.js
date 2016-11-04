var Lawn = (function (_super) {
    __extends(Lawn, _super);
    function Lawn() {
        _super.call(this);
        this.addBitmap("lawn_guarding_png")
            .addClip("lawn_dying", "east-dying");
    }
    var d = __define,c=Lawn,p=c.prototype;
    p._idle = function () {
        this.guard();
    };
    p._act = function () {
        if (this._state == EntityState.dying) {
            this.erase();
            return false;
        }
        else {
            return true;
        }
    };
    return Lawn;
}(Effect));
egret.registerClass(Lawn,'Lawn');
//# sourceMappingURL=Lawn.js.map