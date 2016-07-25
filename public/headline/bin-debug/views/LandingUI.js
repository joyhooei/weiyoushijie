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
        application.dao.fetch("Notification", {}, { order: 'action DESC, create_time DESC', limit: 1 }).then(function (notifications) {
            if (notifications.length > 0) {
                application.showUI(new NotificationUI(notifications[0], function () {
                    self.btnLogin.visible = true;
                }), self);
                self.showedNotification = notifications[0];
            }
            else {
                self.btnLogin.visible = true;
            }
        }, function (error) {
            self.btnLogin.visible = true;
        });
        application.stopwatch.addEventListener("hour", function (event) {
            application.dao.fetch("Notification", {}, { order: 'action DESC, create_time DESC', limit: 1 }).then(function (notifications) {
                if (notifications.length > 0) {
                    if (!(self.showedNotification && self.showedNotification.id == notifications[0].id)) {
                        application.showUI(new NotificationUI(notifications[0]));
                        self.showedNotification = notifications[0];
                    }
                }
            });
        }, this);
        self.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (egret.getOption("wysj_account_id")) {
                application.dao.fetch("Account", { id: egret.getOption("wysj_account_id") }, { limit: 1 }).then(function (accounts) {
                    if (accounts.length > 0) {
                        application.logined(accounts[0]);
                        application.hideUI(self);
                    }
                    else {
                        Toast.launch('玩家不存在，ID = ' + egret.getOption("wysj_account_id"));
                    }
                }, function (error) {
                    Toast.launch(error);
                });
            }
            else {
                application.channel.login().then(function (account) {
                    application.logined(account);
                    application.hideUI(self);
                }, function (error) {
                    Toast.launch(error);
                });
            }
        }, self);
    };
    return LandingUI;
}(eui.Component));
egret.registerClass(LandingUI,'LandingUI');
