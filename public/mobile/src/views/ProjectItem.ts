/**
 *
 * @author 
 *
 */
class ProjectItem extends eui.Component {
    private _project : Project;
    
    private _myProject : any;
    
    private _myProp: number;
    
    private lblLevel: eui.Label;
    private lblOutput: eui.Label; 
    private lblPrice: eui.Label;
    
    public constructor(myProject: any,project: Project,myProp:number) {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        this.skinName = "resource/custom_skins/ProjectItemSkin.exml";
        
        this._myProject = myProject;
        this._project = project;
        this._myProp = myProp;
    }
    
    private uiCompHandler(): void {
        if (!this._myProject) {
            this.lblLevel.text = "";
            this.lblOutput.text = "";
            this.lblPrice.text = "";
        } else {
            this.lblLevel.text = this._myProject.level;
            this.lblOutput.text = this._project.output(this._myProject.level,this._myProject.achieve,this._myProp).toString();
            this.lblPrice.text = this._project.price(this._myProject.level + 1).toString();            
        }
    }
}
