var LandingUI = (function (_super) {
    __extends(LandingUI, _super);
    function LandingUI() {
        _super.call(this, "landingUISkin");
    }
    var d = __define,c=LandingUI,p=c.prototype;
    p.onRefresh = function () {
        var self = this;
        self.btnLogin.visible = false;
        application.dao.fetch("Notification", {}, { order: 'action DESC, create_time DESC', limit: 1 }).then(function (notifications) {
            if (notifications.length > 0) {
                application.showUI(new NotificationUI(notifications[0], function () {
                    self.loginQuietly();
                }), self);
                self.showedNotification = notifications[0];
            }
            else {
                self.loginQuietly();
            }
        }, function (error) {
            self.loginQuietly();
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
            application.channel.login().then(function (account) {
                application.logined(account);
                application.hideUI(self);
            }, function (error) {
                Toast.launch(error);
            });
        }, self);
    };
    p.loginQuietly = function () {
        var self = this;
        if (egret.getOption("wysj_account_id")) {
            application.dao.fetch("Account", { id: egret.getOption("wysj_account_id") }, { limit: 1 }).then(function (accounts) {
                if (accounts.length > 0) {
                    application.logined(accounts[0]);
                    application.hideUI(self);
                }
                else {
                    Toast.launch('玩家不存在，ID = ' + egret.getOption("wysj_account_id"));
                    self.btnLogin.visible = true;
                }
            }, function (error) {
                Toast.launch(error);
                self.btnLogin.visible = true;
            });
        }
        else {
            application.channel.loginQuietly().then(function (account) {
                application.logined(account);
                application.hideUI(self);
            }, function (error) {
                self.btnLogin.visible = true;
            });
        }
    };
    return LandingUI;
}(AbstractUI));
egret.registerClass(LandingUI,'LandingUI');
//# sourceMappingURL=LandingUI.js.map