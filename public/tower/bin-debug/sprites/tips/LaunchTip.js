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
        this._wave = this._get(properties, "wave", 0);
    };
    p.select = function (again) {
        application.battle.launchWave(this._wave);
        var gold = Math.round(40 * (this._dyingTicks - this._ticks) / this._dyingTicks);
        application.battle.incGolds(gold);
        this.erase();
    };
    p._dying = function () {
        if (this._ticks > this._dyingTicks) {
            application.battle.launchWave(this._wave);
            this.erase();
        }
        else {
            if (this._ticks % 3 == 0) {
                this.stain();
            }
        }
        this._ticks++;
    };
    p.paint = function () {
        _super.prototype.paint.call(this);
        this._shapeShield.graphics.clear();
        this._shapeShield.graphics.lineStyle(2, 0xff0000);
        this._shapeShield.graphics.drawArc(this.width / 2, this.height / 2, this.width / 2, 0, (2 * this._ticks / this._dyingTicks) * Math.PI, false);
        this._shapeShield.graphics.endFill();
    };
    return LaunchTip;
}(Tip));
egret.registerClass(LaunchTip,'LaunchTip');
//# sourceMappingURL=LaunchTip.js.map