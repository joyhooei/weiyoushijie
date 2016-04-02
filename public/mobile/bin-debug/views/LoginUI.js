/**
 *
 * @author
 *
 */
var LoginUI = (function (_super) {
    __extends(LoginUI, _super);
    function LoginUI() {
        _super.call(this);
        this.onCreate = function (data) {
            router.changePage(new LoginTypeUI(data));
        };
        this.onSuccess = function (data) {
            new Login().login(data);
        };
        this.onFail = function (data) {
            egret.log("log Fail");
        };
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/loginUISkin.exml";
    }
    var d = __define,c=LoginUI,p=c.prototype;
    p.uiCompHandler = function () {
        this.login_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
    };
    p.onTouchTapHandler = function (e) {
        var self = this;
        nest.core.startup({ egretAppId: 88888, version: 2, debug: true }, function (resultInfo) {
            if (resultInfo.result == 0) {
                self.checkLogin();
            }
        });
    };
    p.checkLogin = function () {
        egret.log("checkLogin start");
        nest.easeuser.login(this);
    };
    return LoginUI;
})(eui.Component);
egret.registerClass(LoginUI,'LoginUI',["nest.easeuser.ILoginCallbacks"]);
//# sourceMappingURL=LoginUI.js.map