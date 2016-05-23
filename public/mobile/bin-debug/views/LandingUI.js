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
            nest.easyuser.startup({ egretAppId: 90240, version: 2, debug: true }, function (resultInfo) {
                if (resultInfo.result == 0) {
                    self.login();
                }
            });
        }, self);
    };
    p.login = function () {
        application.hideUI(this);
        var loginTypes = nest.easyuser.getLoginTypes();
        if (loginTypes.length > 0) {
            //需要显示对应的登录按钮
            var loginView = new LoginUI(loginTypes, function (logType) {
                nest.easyuser.login(logType, function (data) {
                    if (data.result == 0) {
                        application.login(data);
                    }
                    else {
                        egret.log("log Fail");
                    }
                });
            });
            application.showUI(loginView);
        }
        else {
            //不需要登录按钮，直接调用登录进游戏
            nest.easyuser.login({}, function (data) {
                if (data.result == 0) {
                    application.login(data);
                }
                else {
                    egret.log("log Fail");
                }
            });
        }
    };
    return LandingUI;
}(eui.Component));
egret.registerClass(LandingUI,'LandingUI');
