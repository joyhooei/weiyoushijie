class LoginRewardUI extends eui.Component {
    private imgPick1: eui.Image;
    private imgPick2: eui.Image;
    private imgPick3: eui.Image;
    private imgPick4: eui.Image;
    private imgPick5: eui.Image;
    private imgPick6: eui.Image;
    private imgPick7: eui.Image;
    private imgPicks: eui.Image[];
    
    private imgRet: eui.Image;
    
    private audits: any[];
    
    private rewardData = [300, 500, 800, 1200, 2000, 3000, 5000];

    constructor() {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE, this.refresh, this);

        this.skinName = "resource/custom_skins/loginRewardUISkin.exml";
		
		this.imgPicks = [this.imgPick1, this.imgPick2, this.imgPick3, this.imgPick4, this.imgPick5, this.imgPick6, this.imgPick7];
		for(var i = 0; i < this.imgPicks.length; i ++){
		    this.imgPicks[i].visible = false;
		}

        this.imgRet.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function() {
            application.hideUI(this);
        },this);	
        
        this.imgPick1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(ev){
            this.claim(1);
        },this);
        this.imgPick2.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.claim(2);
        },this);
        this.imgPick3.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.claim(3);
        },this);
        this.imgPick4.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.claim(4);
        },this);
        this.imgPick5.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.claim(5);
        },this);
        this.imgPick6.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.claim(6);
        },this);
        this.imgPick7.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(ev) {
            this.claim(7);
        },this);
    }
    
    private claim(index:number) {
        for(var i = 0; i < this.audits.length; i++) {
            if (this.audits[i].rewards == this.rewardData[index] && this.audits[i].claimed == 0) {
                Audit.claim(this.audits[i]);
                this.renderAudit(this.audits[i]);
                
                application.me.attrs.diamond += this.rewardData[index];
                application.me.saveNow();
                
                application.channel.track(TRACK_CATEGORY_DIAMOND, TRACK_ACTION_INC, "连续登录", this.audits[i].rewards); 
            }
        }
    }

    public refresh(): void {
        var self = this;

		Audit.check(application.me).then(function(audits){
			self.audits = audits;
			
            for(var i = 0; i < self.imgPicks.length;i++) {
                self.imgPicks[i].visible = false;
            }
            
            for (var i = 0; i < audits.length; i++) {
                self.renderAudit(audits[i]);
            }
        })
    }

    private renderAudit(audit: any) {
        var imgPic = this.imgPicks[0];
        for(var i = 0; i < this.rewardData.length; i ++) {
            if (audit.rewards == this.rewardData[i]) {
                imgPic = this.imgPicks[i];
                
                break;
            }
        }
		
		imgPic.visible = true;
        if(audit.claimed == 1) {
            imgPic.source = "picked_png";
        } else {
            imgPic.source = "pick_png";
        }
    }
}
