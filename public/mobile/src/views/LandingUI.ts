class LandingUI extends eui.Component implements nest.easeuser.ILoginCallbacks {
    private btnLogin: eui.Button;
    private btnChange: eui.Button;
    
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        
        this.skinName = "resource/custom_skins/landingUISkin.exml";
    }

    private uiCompHandler(): void {
        var self = this;
        
        this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            nest.core.startup({ egretAppId: 90240,version: 2,debug: true },function(resultInfo: nest.core.ResultCallbackInfo) {
                if(resultInfo.result == 0) {
                    nest.easeuser.login(self);
                }
            });
        },this);

        this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
        },this);
    }

    public onCreate(data: nest.easeuser.ILoginTypes): void {
        application.router.changePage(new LoginUI(data));
    }

    public onSuccess(data: nest.user.LoginCallbackInfo): void {
        application.login(data);
    }

    public onFail(data: nest.core.ResultCallbackInfo): void {
        egret.log("log Fail");
    }
}