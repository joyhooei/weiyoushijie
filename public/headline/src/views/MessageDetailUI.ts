class MessageDetailUI extends eui.Component {
    private imgBack: eui.Image;
    
    private imgOperate: eui.Image;

    private imgAttach: eui.Image;

    private lblAttach: eui.Label;
    
    private lblContent: eui.Label;

    constructor(message:any) {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,function(){
            this.lblContent.text = message.content;

            if(message.attach_quantity > 0) {
                this.imgAttach.visible = true;
                this.lblAttach.visible = true;
                
                if(message.attach_category == "diamond") {
                    this.imgAttach.source = "dia_png";
                } else if(message.attach_category == "gold") {
                    this.imgAttach.source = "coin_png";
                } else {
                    this.imgAttach.source = "metal_png";
                }
                this.lblAttach.text = "x" + message.attach_quantity;
            } else {
                this.imgAttach.visible = false;
                this.lblAttach.visible = false;
            }

            if(message.state == 0 && message.attach_quantity > 0) {
                this.imgOperate.source = "get_png";
            } else {
                this.imgOperate.source = "del_png";
            }

            this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                application.hideUI(this);;
            },this);

            this.imgOperate.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                if(this.imgOperate.source == "get_png") {
                    if(message.attach_category == "diamond") {
                        application.me.attrs.diamond += message.attach_quantity;
                        
                        application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_INC, message.title, message.attach_quantity); 
                    } else if(message.attach_category == "gold") {
                        application.me.attrs.gold += message.attach_quantity;
                    } else {
                        application.me.attrs.metal += message.attach_quantity;
                    }
                    message.state = 1;
                    application.dao.save("Message",message);
                    
                    application.me.saveNow();

                    this.imgOperate.source = "del_png";
                } else {
                    message.state = 2;
                    application.dao.save("Message",message);

                    application.hideUI(this);
                }
            },this);            
        },this);
        
        this.skinName = "resource/custom_skins/messageDetailUISkin.exml";
    }
}
