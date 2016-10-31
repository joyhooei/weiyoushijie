var Spike = (function (_super) {
    __extends(Spike, _super);
    function Spike() {
        _super.call(this);
        this.addClip("spike_fighting");
    }
    var d = __define,c=Spike,p=c.prototype;
    p._hitTarget = function () {
        if (this._target.active()) {
            this._target.kill();
        }
    };
    return Spike;
}(Bomb));
egret.registerClass(Spike,'Spike');
//# sourceMappingURL=Spike.js.map