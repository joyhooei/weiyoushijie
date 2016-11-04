var AnimatingEffect = (function (_super) {
    __extends(AnimatingEffect, _super);
    function AnimatingEffect() {
        _super.apply(this, arguments);
    }
    var d = __define,c=AnimatingEffect,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._idleTicks = this._get(properties, "idleTicks", (Math.random() * 10) * application.frameRate);
        this._playTimes = 0;
    };
    p._idle = function () {
        if (this._ticks > this._idleTicks) {
            this.move();
        }
        else {
            this._ticks++;
        }
    };
    p._act = function () {
        this._playTimes--;
        if (this._playTimes <= 0) {
            return false;
        }
        return true;
    };
    p._moving = function () {
        if (this._ticks % (application.frameRate << 3) == 0) {
            this._playTimes = 5;
            this.stain();
        }
        this._ticks++;
    };
    return AnimatingEffect;
}(Effect));
egret.registerClass(AnimatingEffect,'AnimatingEffect');
//# sourceMappingURL=AnimatingEffect.js.map