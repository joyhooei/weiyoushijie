class LandingUI extends eui.Component {
    private btnLogin: eui.Button;
    
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        
        this.skinName = "resource/custom_skins/landingUISkin.exml";
    }

    private uiCompHandler(): void {
        var self = this;
        
        self.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.channel.login().then(function(token:string){
                application.logined(token);
				application.hideUI(self);
			}, function(error){
				Toast.launch(error);
			});
        }, self);
    }
}