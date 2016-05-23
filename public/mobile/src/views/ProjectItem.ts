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
    
    public constructor(myProject: any,project: Project, iconName:string, titleName:string) {
        super();

        this._myProject = myProject;
        this._project   = project;
        
        this.addEventListener(eui.UIEvent.COMPLETE,this.firstRefresh,this);
        this.skinName = "resource/custom_skins/projectItemSkin.exml";
        
        this.imgIcon.source = iconName;
		this.imgTitle.source = titleName;
    }
	
	public refresh(myProject: any): void {
		this._myProject = myProject;
		
        if (this._myProject.unlocked == 1) {
			this.renderLocked();		
        } else {
			this.renderUnlocked();
        }
	}
    
    private firstRefresh(): void {
		this.refresh(this._myProject);
		
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
    }
	
	private onUpgrade(): void {
		if (this._myProject.unlocked == 1) {
			this.unlock();
		} else {
			this.upgrade(1);
		}
	}

    private output(): number {
        return this._project.output(this._myProject.level, this._myProject.achieve);
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
        
        var tiltels = ['英勇黄铜', '不屈白银', '荣耀黄金', '华贵铂金', '璀璨钻石', '超凡大师', '最强王者', '近神Dominating', '神Godlike', '超神Legendary'];
        var help = tiltels[achieve - 1] + "\n";
        help += "完成成就提高金币产量" + this._project.outputRatioOfAchieve(achieve - 1).toString() + "倍，并获得100钻石奖励。\n";
        help += this._project.levelOfAchieve(achieve - 1).toString() + "级 解锁成就\n";

        if(achieve <= this._myProject.achieve) {
            //已经购买的成就
            img.source = icon;
            grp.addChild(img);

            img.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                application.showHelp(help);
            },this);
        } else {
            if(this._myProject.level >= this._project.levelOfAchieve(achieve - 1)) {
                //可以购买的成就
                img.source = icon;
                grp.addChild(img);

                img = new eui.Image();
                img.source = "acvnone_png";
                grp.addChild(img);

                img.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                    application.showUI(new BuyAchieveUI(self._myProject,self._project,icon));
                },this);

            } else {
                //不可以购买的成就
                img.source = "acvlock_png";
                grp.addChild(img);

                img.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
                    application.showHelp(help);
                },this);
            }
        }
        
        return grp;
	}
	
	private renderLocked(): void {
		this.lblLevel.text  = "0";
		this.lblOutput.text = "0";
		this.lblPrice.text  = this._project.priceOf(this._myProject.level + 1).toString();

        this.imgUpgrade10.source = "upgrade10g_png";
        this.imgUpgrade100.source = "upgrade100g_png";           
        this.imgUpgrade.source = 'upgradeg_png';
 		
		this.renderAchieves();			
	}
	
	private renderUnlocked(): void {
		this.lblLevel.text  = this._myProject.level;
		this.lblOutput.text = application.format(this.output());
		this.lblPrice.text  = application.format(this._project.priceOf(this._myProject.level + 1));
		
        if(this._myProject.sequence % 2 == 0) {        
            this.imgUpgrade10.source = "upgrade10_png";
		    this.imgUpgrade100.source = "upgrade100_png";           
            this.imgUpgrade.source = 'upgrade_png';
        } else {
            this.imgUpgrade10.source = "upgrade10b_png";
            this.imgUpgrade100.source = "upgrade100b_png";
            this.imgUpgrade.source = 'upgradeb_png';
        }
		
		this.renderAchieves();
	}
    
    private upgrade(step:number): void {
        let self = this;
        
        let p = this._project.price(this._myProject.level + 1, step);
        if(application.usableGold() < p) {
			Toast.launch("没有足够的金币");
			
			return;
		}
		
        let oldOutput = this.output();
		this._myProject.level += step;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
				application.buyOutput(p, 0, self.output() - oldOutput, null, function(succeed, c){
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
        if(application.usableGold() < p) {
			Toast.launch("没有足够的金币");
			
			return;
		}
		
		self._myProject.unlocked = 0;
		
		application.dao.save("Project",self._myProject,function(succeed,proj) {
			if(succeed) {
    			if (self._myProject.sequence < 19) {
    				let project:any = {};
    				project.customer_id = application.customer.id;
    				project.sequence = self._myProject.sequence + 1;
    				project.unlocked = 1;
    				project.achieve = 0;
    				project.level = 0;
    				application.dao.save("Project",project,function(succeed,proj) {
    					if (succeed) {
    						application.buyOutput(p, 0, self.output(), proj, function(succeed, c) {
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
                    application.buyOutput(p,0,self.output(),null,function(succeed,c) {
                        if(succeed) {
                            self.renderUnlocked();
                        } else {
                            Toast.launch("解锁失败");
                        }
                    });    			    
    			}
			} else {
				Toast.launch("解锁失败");
			}
		});
    }
}
