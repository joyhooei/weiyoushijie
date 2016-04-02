/**
 *
 * @author
 *
 */
var LoginTypeUI = (function (_super) {
    __extends(LoginTypeUI, _super);
    function LoginTypeUI(loginType) {
        _super.call(this);
        this.loginType = loginType;
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/loginTypeUISkin.exml";
    }
    var d = __define,c=LoginTypeUI,p=c.prototype;
    p.uiCompHandler = function () {
        var self = this;
        for (var i = 0; i < this.loginType.loginTypes.length; i++) {
            var logT = this.loginType.loginTypes[i];
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
                self.loginType.onChoose(this.name);
            }, btn);
        }
    };
    return LoginTypeUI;
})(eui.Component);
egret.registerClass(LoginTypeUI,'LoginTypeUI');
//# sourceMappingURL=LoginTypeUI.js.map