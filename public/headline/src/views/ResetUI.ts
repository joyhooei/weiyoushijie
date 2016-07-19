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
            
            application.me.attrs.diamond += this.diamond;
            application.me.attrs.output  += this.output() - oldOutput;
            application.me.saveNow();
			
			application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_INC, "重置了金手指", this.diamond); 
            
            Toast.launch("成功重置了金手指");
            
            application.hideUI(this);
        }, this );
        
        this.lblDiamond.text = Utility.format(this.diamond);
    }
    
    private output(): number {
        return this.project.output(this.myProject.level, this.myProject.achieve, this.myProject.tool_ratio);
    }
}
