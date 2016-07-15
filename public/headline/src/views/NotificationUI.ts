class MessageDetailUI extends eui.Component {
    private imgOk: eui.Image;
    private lblContent: eui.Label;

    constructor(notification:any, cb:Function) {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,function(){
            this.lblContent.text = notification.content;

            this.imgOk.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                application.hideUI(this);
                
                if (cb) {
                    cb();
                }
            },this);
        },this);
        
        this.skinName = "resource/custom_skins/notificationUISkin.exml";
    }
}
