var LaunchTip = (function (_super) {
    __extends(LaunchTip, _super);
    function LaunchTip() {
        _super.call(this);
        application.battle.enableSelect(this);
    }
    var d = __define,c=LaunchTip,p=c.prototype;
    p.select = function (again) {
        if (again) {
            this.erase();
        }
        else {
            Toast.launch("再次点击开始下一波");
        }
    };
    p.erase = function () {
        _super.prototype.erase.call(this);
        application.battle.launch();
    };
    return LaunchTip;
}(Tip));
egret.registerClass(LaunchTip,'LaunchTip');
//# sourceMappingURL=LaunchTip.js.map