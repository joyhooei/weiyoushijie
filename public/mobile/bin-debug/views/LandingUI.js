var LandingUI = (function (_super) {
    __extends(LandingUI, _super);
    function LandingUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/landingUISkin.exml";
    }
    var d = __define,c=LandingUI,p=c.prototype;
    p.uiCompHandler = function () {
        var self = this;
        this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            nest.core.startup({ egretAppId: 90240, version: 2, debug: true }, function (resultInfo) {
                if (resultInfo.result == 0) {
                    nest.easeuser.login(self);
                }
            });
        }, this);
        this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, this);
    };
    p.onCreate = function (data) {
        application.router.changePage(new LoginUI(data));
    };
    p.onSuccess = function (data) {
        application.login(data);
    };
    p.onFail = function (data) {
        egret.log("log Fail");
    };
    return LandingUI;
}(eui.Component));
egret.registerClass(LandingUI,'LandingUI',["nest.easeuser.ILoginCallbacks"]);
