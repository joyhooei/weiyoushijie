class LandingUI extends eui.Component {
    private btnLogin: eui.Button;
    
    private showedNotification: any;
    
    public constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        
        this.skinName = "resource/custom_skins/landingUISkin.exml";
    }

    private uiCompHandler(): void {
        var self = this;
        
        self.btnLogin.visible = false;
        application.dao.fetch("Notification", {}, {order: 'action DESC, create_time DESC', limit: 1}).then(function(notifications){
        	if (notifications.length > 0) {
        		application.showUI(new NotificationUI(notifications[0], function(){
        			self.btnLogin.visible = true;
        		}), self);
        		
        		self.showedNotification = notifications[0];
        	} else {
        		self.btnLogin.visible = true;
        	}
        }, function(error){
        	self.btnLogin.visible = true;
        })
        
		application.stopwatch.addEventListener("hour", function(event:egret.Event){
			 application.dao.fetch("Notification", {}, {order: 'action DESC, create_time DESC', limit: 1}).then(function(notifications){
			 	if (notifications.length > 0) {
			 		if (!(self.showedNotification && self.showedNotification.id == notifications[0].id)) {
			 			application.showUI(new NotificationUI(notifications[0]));
			 			
			 			self.showedNotification = notifications[0];
			 		}
			 	}
			 });
        }, this);
        
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
