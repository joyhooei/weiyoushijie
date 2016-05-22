class HelpUI extends eui.Component{
    private imgBack:eui.Image;
    
    private lblContent:eui.Label;
    
    constructor(content:string) {
        super();
        
        this.skinName = "resource/custom_skins/helpUISkin.exml";
        
        this.lblContent.text = content;
        
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.back(this);
        }, this );        
    }
}