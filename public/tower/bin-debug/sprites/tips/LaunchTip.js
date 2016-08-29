var LaunchTip = (function (_super) {
    __extends(LaunchTip, _super);
    function LaunchTip() {
        _super.call(this);
        this.touchEnabled = true;
        this._displays.addBitmap("launch_png");
    }
    var d = __define,c=LaunchTip,p=c.prototype;
    p.select = function (again) {
        if (again) {
            application.battle.launch();
            this.erase();
        }
        else {
            Toast.launch("再次点击开始下一波");
        }
    };
    p._dying = function () {
        _super.prototype._dying.call(this);
        this.rotation++;
    };
    return LaunchTip;
}(Tip));
egret.registerClass(LaunchTip,'LaunchTip');
//# sourceMappingURL=LaunchTip.js.map