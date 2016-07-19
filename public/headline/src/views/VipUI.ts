class VipUI extends eui.Component {
    private lblCharge: eui.Label;

    private imgCharge: eui.Image;
    private imgBack: eui.Image;
    
    private imgNext: eui.Image;
    private imgLast: eui.Image;
    
    private imgTitle: eui.Image;
    
    private level: number;

    constructor() {
        super();
        
        this.level = application.me.vip.getLevel();

        this.skinName = "resource/custom_skins/vipUISkin.exml";
        
        this.refresh();

        this.imgNext.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.level ++;
            this.refresh();
        },this); 

        this.imgLast.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            this.level --;
            this.refresh();
        },this); 
        
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.hideUI(this);
        },this); 
        
        this.imgCharge.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            application.hideUI(this);
            
            application.showUI(new ChargeTipUI());
        },this);
    }
    
    private refresh() {
        if(this.level == 0) {
            this.lblCharge.visible = false;
            this.imgLast.visible   = false;
            this.imgNext.visible   = true;
        } else {
			this.lblCharge.visible = true;
			this.imgLast.visible   = true;

			if (this.level == 15) {
				this.imgNext.visible = false;
			} else {
				this.imgNext.visible = true;
			}
		}
		this.lblCharge.text = application.me.attrs.charge;        
        this.imgTitle.source = "vt" + this.level + "_png";
    }
}
