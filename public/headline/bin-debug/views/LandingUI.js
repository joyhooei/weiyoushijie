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
        self.btnLogin.visible = false;
        application.dao.fetch("Notification", {}, { order: 'create_time DESC' }).then(function (notifications) {
            if (notifications.length > 0) {
                var notification = notifications[0];
                application.showUI(new NotificationUI(notification, function () {
                    self.btnLogin.visible = true;
                }), self);
            }
            else {
                self.btnLogin.visible = true;
            }
        }, function (error) {
            self.btnLogin.visible = true;
        });
        self.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.channel.login().then(function (account) {
                application.logined(account);
                application.hideUI(self);
            }, function (error) {
                Toast.launch(error);
            });
        }, self);
    };
    return LandingUI;
}(eui.Component));
egret.registerClass(LandingUI,'LandingUI');
