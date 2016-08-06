var LoginUI = (function (_super) {
    __extends(LoginUI, _super);
    function LoginUI(loginType, onChoose) {
        _super.call(this);
        this.loginTypes = loginType;
        this.onChoose = onChoose;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/loginUISkin.exml";
    }
    var d = __define,c=LoginUI,p=c.prototype;
    p.uiCompHandler = function () {
        var self = this;
        for (var i = 0; i < this.loginTypes.length; i++) {
            var logT = this.loginTypes[i];
            var url = "";
            if (logT.accInfo && logT.accInfo.avatarUrl) {
                url = logT.accInfo.avatarUrl;
            }
            var btn = new LoginButton(logT.loginType, url);
            btn.name = logT.loginType;
            this.btnGroup.addChild(btn);
            btn.scaleX = btn.scaleY = 0.5;
            btn.touchEnabled = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                this.onChoose(this.loginTypes[parseInt(e.currentTarget.name)]);
            }, this);
        }
    };
    return LoginUI;
}(eui.Component));
egret.registerClass(LoginUI,'LoginUI');
//# sourceMappingURL=LoginUI.js.map