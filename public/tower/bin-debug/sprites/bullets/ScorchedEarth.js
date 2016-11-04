var ScorchedEarth = (function (_super) {
    __extends(ScorchedEarth, _super);
    function ScorchedEarth() {
        _super.call(this);
        this.addClip("scorchedearth_fighting", ['south-moving', 'north-moving']);
    }
    var d = __define,c=ScorchedEarth,p=c.prototype;
    p.setTarget = function (target) {
        this._target = target;
        this.moveTo(this.getCenterX(), this.getCenterY() - 100);
    };
    p._hitTarget = function () {
        var xy = this._nextStep();
        var x = xy[0] + (this.width >> 1);
        var y = xy[1] + (this.height >> 1);
        var tx = this._target.getCenterX();
        var ty = this._target.getCenterY();
        var radius = this._hitRadius >> 1;
        Bullet.throw(x, y, tx, ty - radius, "ScorchedEarthBomblet", { hitRadius: radius });
        Bullet.throw(x, y, tx, ty + radius, "ScorchedEarthBomblet", { hitRadius: radius });
        Bullet.throw(x, y, tx - radius, ty, "ScorchedEarthBomblet", { hitRadius: radius });
        Bullet.throw(x, y, tx + radius, ty, "ScorchedEarthBomblet", { hitRadius: radius });
    };
    return ScorchedEarth;
}(Bomb));
egret.registerClass(ScorchedEarth,'ScorchedEarth');
//# sourceMappingURL=ScorchedEarth.js.map