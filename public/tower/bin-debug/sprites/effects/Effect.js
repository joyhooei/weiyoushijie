var Effect = (function (_super) {
    __extends(Effect, _super);
    function Effect() {
        _super.call(this);
    }
    var d = __define,c=Effect,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._idleTicks = this._get(properties, "idleTicks", (Math.random() * 10) * application.frameRate);
    };
    p.paint = function () {
        this._play(this._render(), 5);
    };
    p._idle = function () {
        if (this._ticks > this._idleTicks) {
            this.move();
        }
        else {
            this._ticks++;
        }
    };
    p._moving = function () {
        if (this._ticks % (application.frameRate << 3) == 0) {
            this.stain();
        }
        this._ticks++;
    };
    return Effect;
}(Entity));
egret.registerClass(Effect,'Effect');
//# sourceMappingURL=Effect.js.map