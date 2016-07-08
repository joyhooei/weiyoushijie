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
        self.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.channel.login().then(function (token) {
                application.logined(token);
                application.hideUI(self);
            }, function (error) {
                Toast.launch(error);
            });
        }, self);
    };
    return LandingUI;
}(eui.Component));
egret.registerClass(LandingUI,'LandingUI');
