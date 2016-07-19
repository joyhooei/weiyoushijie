class ProjectItem extends eui.Component {
    private _project : Project;
    
    private _myProject : any;
	
    private imgIcon:eui.Image;
	private imgTitle: eui.Image;
    
    private lblLevel: eui.Label;
    private lblOutput: eui.Label; 
    private lblPrice: eui.Label;
    
    private imgUpgrade: eui.Image;
    private imgUpgrade10: eui.Image; 
    private imgUpgrade100: eui.Image;
    
    private grpAchieve: eui.Group;
    
    public constructor(myProject: any,project: Project) {
        super();

        this._myProject = myProject;
        this._project   = project;
        
        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        this.skinName = "resource/custom_skins/projectItemSkin.exml";
        
        this.imgIcon.source = (myProject.sequence + 1).toString() + "_png";
        this.imgTitle.source = "t" + (myProject.sequence + 1).toString() + "_png";
    }
    
    private uiCompHandler(): void {
        this.renderProject();
        
        this.renderAchieves();
		
		this.lblPrice.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.onUpgrade();
		}, this);
		this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.onUpgrade();
		}, this);

		this.imgUpgrade10.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (this._myProject.unlocked == 0) {
				this.upgrade(10);
			}
		}, this); 

		this.imgUpgrade100.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (this._myProject.unlocked == 0) {
				this.upgrade(100);
			}
		}, this);
		
		application.dao.addEventListener("Project", function(ev:egret.Event){
            var myProject = ev.data;
            if(myProject.id == this._myProject.id) {
                this._myProject = myProject;
                
                this.renderProject();
                this.renderAchieves();    
    		}
    	}, this);
    	
        application.dao.addEventListener("Customer",function(ev: egret.Event) {
            var customer = ev.data;
            
            this.renderProject();
        },this);
    	
    }
	
	private onUpgrade(): void {
		if (this._myProject.unlocked == 1) {
			this.unlock();
		} else {
			this.upgrade(1);
		}
	}

    private output(): number {
        return application.customer.vip.getOutput(this._project.output(this._myProject.level,this._myProject.achieve,this._myProject.tool_ratio));
    }
    
    private renderProject(): void {
        if(this._myProject.unlocked == 1) {
            var p = this._project.priceOf(1);

            this.lblLevel.text = "0";
            this.lblOutput.text = "0";
            this.lblPrice.text = application.format(p);

            if(application.usableGold() > p) {
                this.imgUpgrade.source = "updatedp2_png";
            } else {
                this.imgUpgrade.source = 'upgradeg_png';
            }
            this.imgUpgrade10.source = "upgrade10g_png";
            this.imgUpgrade100.source = "upgrade100g_png";           
        } else {
            var p = application.customer.vip.getUpgrade(this._project.priceOf(this._myProject.level));
            var p10 = application.customer.vip.getUpgrade(this._project.price(this._myProject.level, 10));
            var p100 = application.customer.vip.getUpgrade(this._project.price(this._myProject.level, 100));

            this.lblLevel.text = this._myProject.level;
            this.lblOutput.text = Utility.format(this.output());
            this.lblPrice.text = Utility.format(p);

            if(this._myProject.sequence % 2 == 0) {
                if(application.usableGold() > p10) {
                    this.imgUpgrade10.source = "upgrade10_png";
                } else {
                    this.imgUpgrade10.source = "upgrade10g_png";
                }
                if(application.usableGold() > p100) {
                    this.imgUpgrade100.source = "upgrade100_png";
                } else {
                    this.imgUpgrade100.source = "upgrade100g_png";
                }
                if(application.usableGold() > p) {
                    this.imgUpgrade.source = 'upgrade_png';
                } else {
                    this.imgUpgrade.source = 'upgradeg2_png';
                }
            } else {
                if(application.usableGold() > p10) {
                    this.imgUpgrade10.source = "upgrade10b_png";
                } else {
                    this.imgUpgrade10.source = "upgrade10g_png";
                }
                if(application.usableGold() > p100) {
                    this.imgUpgrade100.source = "upgrade100b_png";
                } else {
                    this.imgUpgrade100.source = "upgrade100g_png";
                }
                if(application.usableGold() > p) {
                    this.imgUpgrade.source = 'upgradeb_png';
                } else {
                    this.imgUpgrade.source = 'upgradeg2_png';
                }                
            }
        }
    }
	
	private renderAchieves(): void {
        var self = this;
    	
        self.grpAchieve.removeChildren();
		
        for(var i = 1; i <= 10; i++) {
            this.grpAchieve.addChild(this.renderAchieve(i));
        }
	}
	
	private renderAchieve(achieve:number): egret.DisplayObject {
    	var self = this;
    	
        let grp = new eui.Group();
        let img = new eui.Image();

        var icon = "acv" + achieve.toString() + "_png";

        if(achieve <= this._myProject.achieve) {
            //已经购买的成就
            img.source = icon;
            grp.addChild(img);
        } else {
			//不允许跨级购买
            if(this._myProject.level >= this._project.achieve(achieve).level && achieve == this._myProject.achieve + 1) {
                //可以购买的成就
                img.source = icon;
                grp.addChild(img);

                img = new eui.Image();
                img.source = "acvnone_png";
                grp.addChild(img);
            } else {
                //不可以购买的成就
                img.source = "acvlock_png";
                grp.addChild(img);
            }
        }
        
        img.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.showUI(new BuyAchieveUI(self._myProject,self._project,achieve));
        },this);
        
        return grp;
	}
    
    private upgrade(step:number): void {
        let self = this;
        
        let p = application.customer.vip.getUpgrade(this._project.price(this._myProject.level, step));
        if(application.customer.usableGold() < p) {
			Toast.launch("没有足够的金币");
			
			return;
		}
		
        let oldOutput = this.output();
		this._myProject.level += step;
		application.dao.save("Project",self._myProject);
        application.buyOutput(p, 0, self.output() - oldOutput);
        
		if (application.guideUI) {
		    application.guideUI.next();
		}          
    }
    
    private unlock(){
        let self = this;

        let p = this._project.priceOf(1);
        if(application.usableGold() < p) {
			Toast.launch("没有足够的金币");
			
			return;
		}
		
		self._myProject.unlocked = 0;		
		application.dao.save("Project",self._myProject);

		if (self._myProject.sequence < 19) {
			let project:any = {};
			project.customer_id = application.customer.me.id;
			project.sequence = self._myProject.sequence + 1;
			project.unlocked = 1;
			project.achieve = 0;
			project.level = 1;
			application.dao.save("Project",project);
			
			application.customer.buyOutput(p, 0, self.output());
		} else {
            application.customer.buyOutput(p,0,self.output());    			    
		}
        
		if (application.guideUI) {
		    application.guideUI.next();
		}        
    }
}
