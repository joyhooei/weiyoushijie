class ResetUI extends eui.Component{
    private imgOk: eui.Image;
    private imgCancel: eui.Image;
    
    private lblDiamond:eui.Label;
    
    private diamond: number;
    private myProject: any;
    private project: any;
    
    constructor(myProject: any,project: any,diamond: number) {
        super();
        
        this.diamond = diamond;
        this.myProject = myProject;
        this.project = project;
       
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/resetUISkin.exml";
    }

    private uiCompHandler():void {
        this.imgCancel.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);
        }, this );
        
        this.imgOk.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            let oldOutput = this.output();
            
            this.myProject.tool_ratio = 1;
            application.dao.save("Project",this.myProject);
            
            application.customer.diamond += this.diamond;
            application.customer.output  += this.output() - oldOutput;
            application.saveCustomerNow();
			
			application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_INC, "重置了金手指", this.diamond); 
            
            Toast.launch("成功重置了金手指");
            
            application.hideUI(this);
        }, this );
        
        this.lblDiamond.text = application.format(this.diamond);
    }
    
    private output(): number {
        return application.vip.getOutput(this.project.output(this.myProject.level, this.myProject.achieve, this.myProject.tool_ratio));
    }
}