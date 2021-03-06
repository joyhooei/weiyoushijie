class StarUI extends AbstractUI {
    public imgBack: eui.Image;
    
    public imgStar: eui.Image;
    
    public imgStart: eui.Image;
    
    public imgPickStick: eui.Image;
    public imgUseStick: eui.Image;
    
    public imgNext: eui.Image;
    public imgLast: eui.Image;
    
    public lblTotalSticks: eui.Label;
    public lblStickPickTime: eui.Label;
    public lblSticks: eui.Label;
    public lblVIPSticks: eui.Label;
    public lblTicketSticks: eui.Label;
    public lblUpgradeHours: eui.Label;
    public lblUpgradeDays: eui.Label;
    
    private _level: number;

	public constructor() {
    	super("starUISkin");
		
		Star.check(application.star);
		if (application.star.opening_level == 0 && application.star.opened_level == 0) {
			this._level = 1;
		} else {
			this._level = Math.min(15, application.star.opened_level + 1);
		}

        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.hideUI(this);
        },this);
        
        this.imgNext.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this._level ++;
            
            this.refresh();
        },this); 

        this.imgLast.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this._level --;
            
            this.refresh();
        },this); 

        this.imgPickStick.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
        	application.star.sticks += parseInt(this.lblTotalSticks.text);
        	application.star.last_pick_time = (new Date()).toString();
            application.dao.save("Star",application.star);
        	
        	this.refresh();
        },this); 

        this.imgUseStick.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
        	application.star.sticks -= 1;
        	application.star.saving_hours += 1;
            application.dao.save("Star",application.star);
        	
        	this.refresh();
        },this);
        
        this.imgStart.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
        	this.imgStart.visible = false;
        	
            application.star.opening_level = application.star.opened_level + 1;
            application.star.open_time = (new Date()).toString();
            
            let vip = application.me.vip.getLevel();
            if (vip >= 5 && vip <= 7) {
            	application.star.saving_hours = 24;
            } else if (vip >= 8 && vip <= 10) {
            	application.star.saving_hours = 24 * 2;
            } else if (vip >= 11 && vip <= 13) {
            	application.star.saving_hours = 24 * 3;
            } else if (vip >= 14 && vip <= 15) {
            	application.star.saving_hours = 24 * 4;
            } else {
            	application.star.saving_hours = 0;
            }
           
            application.dao.save("Star", application.star);
            
            this.refresh();
        },this);        
	}
	
	protected onRefresh() {
		Star.check(application.star);
		
		if (this._level == 1) {
			this.imgNext.visible = true;
			this.imgLast.visible = false;
		} else if (this._level == 15) {
			this.imgNext.visible = false;
			this.imgLast.visible = true;
		} else {
			this.imgNext.visible = true;
			this.imgLast.visible = true;			
		}
		
	    if (this._level <= application.star.opened_level) {
	    	this._renderOpenedStar();
	    } else {
    		if (this._level == application.star.opened_level + 1) {
    			if (application.star.opening_level == 0) {
    				this._renderReadyOpeningStar();
    			} else {
    				this._renderOpeningStar();
    			}
    		} else {
    			this._renderCommingStar();
    		}
	    }
	    
	    this._renderStick();
	}
	
	private _renderCommingStar() {
		this.imgStart.visible = false;
		this.imgUseStick.visible = false;
		
        this.imgStar.source = "s" + this._level + "_png";
		
		this.lblUpgradeHours.text = "";
		this.lblUpgradeDays.text  = "";
	}
	
	private _renderReadyOpeningStar() {
		this.imgStart.visible = true;
		this.imgUseStick.visible = false;
		
		this.imgStar.source = "s" + this._level + "_png";
		
		this.lblUpgradeHours.text = "";
		this.lblUpgradeDays.text  = "";
	}
	
	private _renderOpeningStar() {
		this.imgStart.visible = false;
		
		if (application.star.sticks > 0) {
			this.imgUseStick.visible = true;
		} else {
			this.imgUseStick.visible = false;
		}

		this.imgStar.source = "s" + this._level + "_png";

        this.lblUpgradeDays.text = application.star.opening_level + 3;
		
		let now = new Date();
        if(!application.star.open_time) {
            application.star.open_time = now.toString();
        }
		let openTime = new Date(application.star.open_time);
        let diff = (application.star.opening_level + 3) * 24 * 3600 - Math.floor((now.getTime() - openTime.getTime()) / 1000) - application.star.saving_hours * 3600;
        
        let hours = Math.floor(diff / 3600);
        if (hours > 24) {
            this.lblUpgradeHours.text = Math.floor(hours / 24) + "天" + Math.floor(hours % 24) + "时";
        } else {
            let minutes = Math.floor(diff / 60);
            this.lblUpgradeHours.text = Math.floor(minutes / 60) + "时" + Math.floor(minutes % 60) + "分";
        }
	}
	
	private _renderOpenedStar() {
		this.imgStart.visible = false;
		this.imgUseStick.visible = false;
		
		this.imgStar.source = "s" + this._level + "_png";
		
		this.lblUpgradeHours.text = "";
		this.lblUpgradeDays.text  = "";
	}
	
	private _renderStick() {
		let now = new Date();
		
		let LastPickTime = new Date(application.star.last_pick_time);
        let diff      = Math.floor((now.getTime() - LastPickTime.getTime()) / 1000);
        if(diff >= 60 * 60 * 5) {
            this.lblStickPickTime.text = "";
            this.imgPickStick.visible = true;
        } else {
            diff = 60 * 60 * 5 - diff;
            if (diff > 3600) {
                this.lblStickPickTime.text = (Math.floor(diff / 3600)).toString() + "时" + (Math.floor((diff % 3600)/60)).toString() + "分";
            } else {
                this.lblStickPickTime.text = (Math.floor(diff / 60)).toString() + "分" + (Math.floor(diff % 60)).toString() + "秒";               
            }
            
            this.imgPickStick.visible = false;
		}
		
		this.lblTotalSticks.text = application.star.sticks;
		
        let vip = application.me.vip.getLevel();
        if (vip >= 1 && vip <= 4) {
        	this.lblVIPSticks.text = "3";
        } else if (vip >= 5 && vip <= 7) {
        	this.lblVIPSticks.text = "4";
        } else if (vip >= 8 && vip <= 10) {
        	this.lblVIPSticks.text = "5";
        } else if (vip >= 11 && vip <= 13) {
        	this.lblVIPSticks.text = "6";
        } else if (vip >= 14 && vip <= 15) {
        	this.lblVIPSticks.text = "7";
        } else {
        	this.lblVIPSticks.text = "2";
        }
        if (application.me.attrs.vip > 0) {
			this.lblTicketSticks.text = "1";
        } else {
        	this.lblTicketSticks.text = "0";
        }
        
        this.lblSticks.text = (parseInt(this.lblTicketSticks.text) + parseInt(this.lblVIPSticks.text) + 2).toString();		
	}
}
