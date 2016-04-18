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
    
    private btnUpgrade: eui.Button;
    private btnUpgrade10: eui.Button; 
    private btnUpgrade100: eui.Button;
    private btnUnlock: eui.Button;
    
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
            
            this.btnUpgrade.enabled = false;
            this.btnUpgrade10.enabled = false;
            this.btnUpgrade100.enabled = false;
            
            let p = this._project.priceOf(1);
            if(application.customer.gold >= p) {
                this.btnUnlock.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                    this.unlock();
                },this);
            } else {
                this.btnUnlock.enabled = false;
            }
        } else {
            this.lblLevel.text = this._myProject.level;
            this.lblOutput.text = this._project.output(this._myProject.level,this._myProject.achieve,this._myProp).toString();
            this.lblPrice.text = this._project.priceOf(this._myProject.level + 1).toString();
            
            this.btnUnlock.maxWidth = 0;
            let p = this._project.price(this._myProject.level + 1, 1);
            if(application.customer.gold > p) {
                this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                    this.upgrade(1);
                }, this);
            } else {
                this.btnUpgrade.enabled = false;
            }
            
            p = this._project.price(this._myProject.level + 1,10);
            if(application.customer.gold > p) {
                this.btnUpgrade10.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                    this.upgrade(10);
                }, this); 
            } else {
                this.btnUpgrade10.enabled = false;
            }
            
            p = this._project.price(this._myProject.level + 1,10);
            if(application.customer.gold > p) {
                this.btnUpgrade100.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                    this.upgrade(100);
                }, this);
            } else {
                this.btnUpgrade100.enabled = false;
            }
        }
    }

    private output(): number {
        return this._project.output(this._myProject.level, this._myProject.achieve, application.customer.prop);
    }
    
    private upgrade(step:number): void {
        let self = this;
        
        let p = this._project.price(this._myProject.level + 1, step);
        let oldOutput = this.output();
        if (application.customer.gold > p) {
            this._myProject.level += step;
            application.dao.save("Project",self._myProject, function(succeed, proj) {
                if (succeed) {
                    application.buyOutput(p, 0, self.output() - oldOutput, function(succeed, c){
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
    
    private unlock(){
        let self = this;

        let p = this._project.priceOf(1);
        if(application.customer.gold >= p) {
            self._myProject.unlocked = 1;
            application.dao.save("Project",self._myProject,function(succeed,proj) {
                if(succeed) {
                    var project:any;
                    project.customer_id = application.customer.id;
                    project.sequence = self._myProject.sequence + 1;
                    project.unlocked = 0;
                    project.achieve = 0;
                    project.level = 0;
                    application.dao.save("Project",project,function(succeed,proj) {
                        if (succeed) {
                            application.buyOutput(p, 0, self.output(), function(succeed, c) {
                                if (succeed) {
                                } else {
                                    Toast.launch("解锁失败");
                                }
                            });
                        } else {
                            Toast.launch("解锁失败");
                        }
                    });
                } else {
                    Toast.launch("解锁失败");
                }
            });
        }
    }
	
	private buyAchieveUseGold(){
        let self = this;

        let p = self._project.goldPriceOfAchieve(self._myProject.acheve + 1);
        let oldOutput = self.output();
        if (application.customer.gold > p) {
            this._myProject.achieve += 1;
            application.dao.save("Project",self._myProject, function(succeed, proj) {
                if (succeed) {
                    let newOutput = self.output();
                    application.buyOutput(p, 0, newOutput - oldOutput, function(succeed, c){
                        if (succeed) {
                        } else {
                            Toast.launch("获得成就失败");    
                        }
                    });
                } else {
                    Toast.launch("获得成就失败");
                }
            });
        }
	}
	
	private buyAchieveUseDiamond(){
        let self = this;

        let p = this._project.diamondPriceOfAchieve(this._myProject.acheve + 1);
        let oldOutput = this.output();
        if (application.customer.diamond > p) {
            this._myProject.achieve += 1;
            application.dao.save("Project",self._myProject, function(succeed, proj) {
                if (succeed) {
                    let newOutput = self.output();
                    application.buyOutput(0,p,newOutput - oldOutput, function(succeed, c){
                        if (succeed) {
                        } else {
                            Toast.launch("获得成就失败");    
                        }
                    });
                } else {
                    Toast.launch("获得成就失败");
                }
            });
        }		
	}
}
