class NotificationUI extends AbstractUI {
    private imgOk: eui.Image;
    private lblContent: eui.Label;

    constructor(notification:any, cb?:Function) {
        super("notificationUISkin");

        this.addEventListener(eui.UIEvent.COMPLETE,function(){
            this.lblContent.text = notification.content;

            this.imgOk.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                application.hideUI(this);
                
                if (notification.action == 1) {
        			window.location.reload(false);
        		} else {
                    if (cb) {
                        cb();
                    }
        		}
            },this);
        },this);
    }
}
