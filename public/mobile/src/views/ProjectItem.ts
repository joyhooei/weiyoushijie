/**
 *
 * @author 
 *
 */
class ProjectItem extends eui.Component {
    private _project : Project;
    
    private _myProject : any;
    
    private _myProp: number;
    
    private imgIcon:eui.Image;
    private lblLevel: eui.Label;
    private lblOutput: eui.Label; 
    private lblPrice: eui.Label;
    
    private imgUpgrade: eui.Image;
    private imgUpgrade10: eui.Image; 
    private imgUpgrade100: eui.Image;
    
    private grpAchieve: eui.Group;
    
    public constructor(myProject: any,project: Project,myProp: number,iconName:string) {
        super();

        this._myProject = myProject;
        this._project   = project;
        this._myProp    = myProp;
        
        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        this.skinName = "resource/custom_skins/projectItemSkin.exml";
        
        this.imgIcon.source = iconName;
        
        for(var i = 1; i <= 10; i++) {
            let imgAchieve = new eui.Image();
            imgAchieve.source = "acv" + i.toString() + "_png";
            
            this.grpAchieve.addChild(imgAchieve);
        }
    }
    
    private uiCompHandler(): void {
        if (this._myProject.unlocked == 1) {
            this.lblLevel.text = "0";
            this.lblOutput.text = "0";
            
            
            this.imgUpgrade10.source  = "MPbx10_jpg";
            this.imgUpgrade100.source = "MPBx100_jpg";           
            this.imgUpgrade.source    = 'UpgradeG_png';
            
            let p = this._project.priceOf(1);
            
            this.lblPrice.text = p.toString();
            if(application.customer.gold >= p) {
                this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                    this.unlock();
                },this);
            }
        } else {
            this.lblLevel.text = this._myProject.level;
            this.lblOutput.text = this._project.output(this._myProject.level,this._myProject.achieve,this._myProp).toString();
            this.lblPrice.text = this._project.priceOf(this._myProject.level + 1).toString();
            
            let p = this._project.price(this._myProject.level + 1, 1);
            if(application.customer.gold > p) {
                this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                    this.upgrade(1);
                }, this);
            } else {
                
            }
            
            p = this._project.price(this._myProject.level + 1,10);
            if(application.customer.gold > p) {
                this.imgUpgrade10.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                    this.upgrade(10);
                }, this); 
            } else {
            }
            
            p = this._project.price(this._myProject.level + 1,10);
            if(application.customer.gold > p) {
                this.imgUpgrade100.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                    this.upgrade(100);
                }, this);
            } else {
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
            self._myProject.unlocked = 0;
            application.dao.save("Project",self._myProject,function(succeed,proj) {
                if(succeed) {
                    let project:any = {};
                    project.customer_id = application.customer.id;
                    project.sequence = self._myProject.sequence + 1;
                    project.unlocked = 1;
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
