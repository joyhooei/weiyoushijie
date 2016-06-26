class MessageItem extends eui.Component {
    private imgBg: eui.Image;
    
    private imgOperate: eui.Image;
    
    private lblDay: eui.Label;
    private lblTitle: eui.Label;
    private lblContent: eui.Label;
    
    private imgAttach: eui.Image;
    private lblAttach: eui.Label;
    
    public constructor(message: any) {
        super();

        this.skinName = "resource/custom_skins/messageItemSkin.exml";
        
        this.refresh(message);

        this.lblDay.touchEnabled = false;
        this.lblTitle.touchEnabled = false;
        this.lblContent.touchEnabled = false;
        this.imgAttach.touchEnabled = false;
        this.lblAttach.touchEnabled = false;  
        this.imgBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.showUI(new MessageDetailUI(message));
        },this);
        
        this.imgOperate.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
            if(this.imgOperate.source == "get_png") {
                message.state = 1;
                application.dao.save("Message",message);

                this.imgOperate.source = "del_png";         
            } else {
                message.state = 2;
                application.dao.save("Message",message);
                
                this.parent.removeChild(this);
            }
        }, this);
        
        application.dao.addEventListener("Message",function(ev: egret.Event) {
            if (ev.data.id == message.id) {
                this.refresh(message);
            }
        },this);
    }
    
    private refresh(message) {
        this.lblTitle.text = message.title;
        this.lblContent.text = message.content;

        var now = new Date(message.create_time);
        this.lblDay.text = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();

        if(message.attach_quantity > 0) {
            this.imgAttach.visible = true;

            if(message.attach_category == "diamond") {
                this.imgAttach.source = "dia_png";
            } else if(message.attach_category == "gold") {
                this.imgAttach.source = "coin_png";
            } else {
                this.imgAttach.source = "metal_png";
            }
        } else {
            this.imgAttach.visible = false;
        }

        if(message.state == 0) {
            if(message.attach_quantity > 0) {
                this.imgOperate.source = "get_png";
            } else {
                this.imgOperate.source = "del_png";
            }

            this.imgBg.source = "bar_png";
        } else {
            this.imgOperate.source = "del_png";
            this.imgBg.source = "bargery_png";
        }
      
    }
}