class HelpUI extends eui.Component{
    private imgBack:eui.Image;
    
    private imgIcon:eui.Image;
    private lblContent:eui.Label;
    
    constructor(icon:string, content:string) {
        super();
        
        this.skinName = "resource/custom_skins/helpUISkin.exml";
        
        this.imgIcon.source = icon;
        this.lblContent.text = content;
        
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.back(this);
        }, this );        
    }
}