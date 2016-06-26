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

            if(message.state == 0) {
                if(message.attach_quantity > 0) {
                    if(message.attach_category == "diamond") {
                        this.imgAttach.source = "dia_png";
                    } else if(message.attach_category == "gold") {
                        this.imgAttach.source = "coin_png";
                    } else {
                        this.imgAttach.source = "metal_png";
                    }
                    this.lblAttach.text = "x" + message.attach_quantity;

                    this.imgOperate.source = "get_png";
                } else {
                    this.imgAttach.visible = false;
                    this.lblAttach.visible = false;

                    this.imgOperate.source = "del_png";
                }
            } else {
                this.imgOperate.source = "del_png";
            }

            this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                application.hideUI(this);;
            },this);

            this.imgOperate.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                if(this.imgOperate.source == "get_png") {
                    message.state = 1;
                    application.dao.save("Message",message);

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