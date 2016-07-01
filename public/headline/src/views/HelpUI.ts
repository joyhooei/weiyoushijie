class HelpUI extends eui.Component{
    private imgBack:eui.Image;
    private imgReport:eui.Image;
    
    private lblContent:eui.Label;
    private lblVersion: eui.Label;
    
    constructor(content:string) {
        super();
        
        this.skinName = "resource/custom_skins/helpUISkin.exml";
        
        this.lblContent.text = content;
        
        this.lblVersion.text = application.version;
        
        this.imgReport.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);
            
            application.showUI(new ReportUI());
        }, this ); 
        
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);
        }, this );        
    }
}