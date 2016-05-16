class LandingUI extends eui.Component {
    private btnLogin: eui.Button;
    private btnChange: eui.Button;
    
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        
        this.skinName = "resource/custom_skins/landingUISkin.exml";
    }

    private uiCompHandler(): void {
        var self = this;
        
        self.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            nest.easyuser.startup({ egretAppId: 90240,version: 2,debug: true },function(resultInfo: nest.core.ResultCallbackInfo) {
                if(resultInfo.result == 0) {
					self.login();
				}
            });
        },self);

        self.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            //TODO
        },self);
    }
	
	private login(): void {
        var loginTypes: Array<nest.easyuser.ILoginType> = nest.easyuser.getLoginTypes();

		if (loginTypes.length > 0) {
			//需要显示对应的登录按钮
            var loginView: LoginUI = new LoginUI(loginTypes,function(logType: nest.easyuser.ILoginType) {
                nest.easyuser.login(logType, function (data:nest.user.LoginCallbackInfo) {
					if (data.result == 0) {
						application.login(data);
					} else {
						egret.log("log Fail");
					}
				});
			});

			application.router.changePage(loginView);
		} else {
			//不需要登录按钮，直接调用登录进游戏
            nest.easyuser.login({}, function (data:nest.user.LoginCallbackInfo) {
				if (data.result == 0) {
					application.login(data);
				} else {
					egret.log("log Fail");
				}
			});
		}
	}
}