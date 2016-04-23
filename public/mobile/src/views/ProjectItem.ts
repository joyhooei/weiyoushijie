class ProjectItem extends eui.Component {
    private _project : Project;
    
    private _myProject : any;
	
    private imgIcon:eui.Image;
	private lblTitle: eui.Label;
    
    private lblLevel: eui.Label;
    private lblOutput: eui.Label; 
    private lblPrice: eui.Label;
    
    private imgUpgrade: eui.Image;
    private imgUpgrade10: eui.Image; 
    private imgUpgrade100: eui.Image;
    
    private grpAchieve: eui.Group;
    
    public constructor(myProject: any,project: Project, iconName:string, title:string) {
        super();

        this._myProject = myProject;
        this._project   = project;
        
        this.addEventListener(eui.UIEvent.COMPLETE,this.uiCompHandler,this);
        this.skinName = "resource/custom_skins/projectItemSkin.exml";
        
        this.imgIcon.source = iconName;
		this.lblTitle.text = title;
    }
    
    private uiCompHandler(): void {
        if (this._myProject.unlocked == 1) {
			this.renderLocked();		
        } else {
			this.renderUnlocked();
        }

		this.imgUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			if (this._myProject.unlocked == 1) {
				this.unlock();
			} else {
				this.upgrade(1);
			}
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
    }

    private output(): number {
        return this._project.output(this._myProject.level, this._myProject.achieve, application.customer.prop);
    }
	
	private renderAchieves(): void {
		this.grpAchieve.removeAllChildren();
		
        for(var i = 1; i <= 10; i++) {
            let imgAchieve = new eui.Image();
			if (i < this._myProject.achieve) {
            	imgAchieve.source = "acv" + i.toString() + "_png";
				
				imgAchieve.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
					//show help
				}, this);
			} else {
            	imgAchieve.source = "acvlock_png";
				
				imgAchieve.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
					//show buy options
				}, this);
			}
            
            this.grpAchieve.addChild(imgAchieve);
        }
	}
	
	private renderLocked(): void {
		this.lblLevel.text  = "0";
		this.lblOutput.text = "0";
		this.lblPrice.text  = this._project.priceOf(this._myProject.level + 1).toString();

		this.imgUpgrade10.source  = "MPbx10_jpg";
		this.imgUpgrade100.source = "MPBx100_jpg";           
		this.imgUpgrade.source    = 'UpgradeG_png';
		
		this.renderAchieves();			
	}
	
	private renderUnlocked(): void {
		this.lblLevel.text  = this._myProject.level;
		this.lblOutput.text = this.output().toString();
		this.lblPrice.text  = this._project.priceOf(this._myProject.level + 1).toString();
		
		this.imgUpgrade10.source  = "upgrade_png";
		this.imgUpgrade100.source = "upgrade10_png";           
		this.imgUpgrade.source    = 'upgrade100_png';
		
		this.renderAchieves();
	}
    
    private upgrade(step:number): void {
        let self = this;
        
        let p = this._project.price(this._myProject.level + 1, step);
        if(application.customer.gold < p) {
			Toast.launch("没有足够的金币");
			
			return;
		}
		
        let oldOutput = this.output();
		this._myProject.level += step;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
				application.buyOutput(p, 0, self.output() - oldOutput, function(succeed, c){
					if (succeed) {
						//升级成功，需要显示新的级别、秒产、升级价格，如果到了成就的级别，还需要显示成就
						self.renderUnlocked();
					} else {
						Toast.launch("升级失败");    
					}
				});
			} else {
				Toast.launch("升级失败");
			}
		});
    }
    
    private unlock(){
        let self = this;

        let p = this._project.priceOf(1);
        if(application.customer.gold < p) {
			Toast.launch("没有足够的金币");
			
			return;
		}
		
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
								self.renderUnlocked();
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
	
	private buyAchieveUseGold(){
        let self = this;

        let p = self._project.goldPriceOfAchieve(self._myProject.acheve + 1);
        if (application.customer.gold < p) {
			Toast.launch("没有足够的金币");
			
			return;
		}
		
        let oldOutput = self.output();
		self._myProject.achieve += 1;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
				let newOutput = self.output();
				application.buyOutput(p, 0, newOutput - oldOutput, function(succeed, c){
					if (succeed) {
						self.renderUnlocked();
					} else {
						Toast.launch("获得成就失败");    
					}
				});
			} else {
				Toast.launch("获得成就失败");
			}
		});
	}
	
	private buyAchieveUseDiamond(){
        let self = this;

        let p = self._project.diamondPriceOfAchieve(self._myProject.acheve + 1);
        if (application.customer.diamond < p) {
			Toast.launch("没有足够的钻石");
			
			return;
		}
		
        let oldOutput = self.output();
		self._myProject.achieve += 1;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
				let newOutput = self.output();
				application.buyOutput(0, p, newOutput - oldOutput, function(succeed, c){
					if (succeed) {
						self.renderUnlocked();
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
