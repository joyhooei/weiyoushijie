class CompensationItem extends eui.Component {
    private imgBg: eui.Image;
    
    private imgDelete: eui.Image;
    private imgPick: eui.Image;
    
    private lblContent: eui.Label;
    
    public constructor(compensation: any) {
        super();

        this.skinName = "resource/custom_skins/compensationItem.exml";
        
		this.imgPick.visible = false;
        if (compensation.state == 0) {
			if (compensation.gold > 0 || compensation.metal > 0 || compensation.diamond > 0 || compensation.vip > 0) {
				this.imgPick.visible = true;

				this.imgPick.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
					compensation.state = 1;
					application.dao.save("Compensation", compensation);

					this.imgPick.visible = false;
				}, this);
			}
        }
        
        this.imgDelete.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			compensation.state = 2;
            application.dao.save("Compensation", compensation);
            
            this.parent.removeChild(this);
        }, this);
    }
}