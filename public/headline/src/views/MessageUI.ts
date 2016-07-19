class MessageUI extends eui.Component {
    private imgBack: eui.Button;
    
    private lstMessage:eui.Group;
	
	private messages: any[];
	private messagesPicked: any[];

    constructor() {
        super();
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/messageUISkin.exml";
    }
    
    public refresh(): void {
		var self = this;
		
        self.lstMessage.removeChildren();
		
        application.dao.fetch("Message",{ customer_id: application.me.attrs.id,state: 0 },{ order: "create_time ASC" },function(succeed,messages) {
            if(succeed && messages.length >= 1) {
                self.messages = messages;				
                self.renderMessages(messages);
			}
		});
		
        application.dao.fetch("Message",{ customer_id: application.me.attrs.id,state: 1 },{ order: "update_time DESC" },function(succeed,messages) {
            if(succeed && messages.length >= 1) {
                self.messagesPicked = messages;
                self.renderMessages(messages);
			}
		});
    }
	
    private renderMessages(messages) {
        for(var i = 0;i < messages.length; i++) {
            this.lstMessage.addChild(new MessageItem(messages[i]));
		}
	}

    private uiCompHandler():void {
        this.refresh();

        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.hideUI(this);
        },this);
    } 
}
