class LandingUI extends eui.Component {
    private btnLogin: eui.Button;
    
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        
        this.skinName = "resource/custom_skins/landingUISkin.exml";
    }

    private uiCompHandler(): void {
        var self = this;
        
        self.btnLogin.visible = false;
        application.dao.find("Notification", {}, {order: 'create_time DESC'}).then(function(notifications){
        	if (notifications.length > 0) {
        		let notification = notifications[0];
        		application.showUI(new NotificationUI(notification, function(){
        			self.btnLogin.visible = true;
        		}), self);	
        	} else {
        		self.btnLogin.visible = true;
        	}
        }, function(error){
        	self.btnLogin.visible = true;
        })
        
        self.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.channel.login().then(function(account:any){
                application.logined(account);
				application.hideUI(self);
			}, function(error){
				Toast.launch(error);
			});
        }, self);
    }
}
