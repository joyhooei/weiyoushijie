var LaunchTip = (function (_super) {
    __extends(LaunchTip, _super);
    function LaunchTip() {
        _super.call(this);
        this.touchEnabled = true;
        this.addBitmap("launch_png");
        this._shapeShield = new egret.Shape();
        this.addChild(this._shapeShield);
    }
    var d = __define,c=LaunchTip,p=c.prototype;
    p.initialize = function (properties) {
        _super.prototype.initialize.call(this, properties);
        this._queue = this._get(properties, "queue", 0);
        this._wave = this._get(properties, "wave", 0);
    };
    p.select = function (again) {
        if (again) {
            this.erase();
            application.battle.launch(this._wave, this._queue);
        }
        else {
            Toast.launch("再次点击开始下一波");
        }
    };
    p._dying = function () {
        if (this._ticks > this._dyingTicks) {
            this.erase();
            application.battle.launch(this._wave, this._queue);
        }
        else {
            if (this._ticks % 3 == 0) {
                this.stain();
            }
        }
        this._ticks++;
    };
    p.paint = function () {
        this._shapeShield.graphics.clear();
        this._shapeShield.graphics.lineStyle(2, 0xffff00);
        this._shapeShield.graphics.drawArc(this.width / 2, this.height / 2, this.width / 2, 0, (2 * this._ticks / this._dyingTicks) * Math.PI, false);
        this._shapeShield.graphics.endFill();
    };
    return LaunchTip;
}(Tip));
egret.registerClass(LaunchTip,'LaunchTip');
//# sourceMappingURL=LaunchTip.js.map