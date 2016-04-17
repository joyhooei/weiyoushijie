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

        this._myProject = myProject;
        this._project   = project;
        this._myProp    = myProp;
        
        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        this.skinName = "resource/custom_skins/projectItemSkin.exml";
    }
    
    private uiCompHandler(): void {
        if (this._myProject.unlocked == 1) {
            this.lblLevel.text = "";
            this.lblOutput.text = "";
            this.lblPrice.text = "";
        } else {
            this.lblLevel.text = this._myProject.level;
            this.lblOutput.text = this._project.output(this._myProject.level,this._myProject.achieve,this._myProp).toString();
            this.lblPrice.text = this._project.priceOf(this._myProject.level + 1).toString();            
        }
    }
    
    private upgrade(step:number): void {
        let self = this;
        
        let p = this._project.price(this._myProject.level + 1, step);
        let oldOutput = this._project.output(this._myProject.level, application.customer.achieve, application.customer.prop);
        if (application.customer.gold > p) {
            this._myProject.level += step;
            application.dao.save("Project",self._myProject, function(succeed, proj) {
                if (succeed) {
                    application.customer.gold -= p;
                    application.customer.output += self._project.output(self._myProject.level, application.customer.achieve, application.customer.prop) - oldOutput;
                    application.dao.save("Customer", application.customer, function(succeed, c){
                        if (succeed) {
                        } else {
                            Toast.launch("升级失败");    
                        }
                    });
                } else {
                    Toast.launch("升级失败");
                }
            });
        }
    }
}
