class GuideUI extends eui.Component {
    //用4个矩形围成这样一个中空的形状，调整4个矩形的位置宽高，使得中空的矩形是你需要暴露的UI界面区域。
    private rcTop: egret.Rect;
    private rcMiddle: egret.Rect;
    private rcBottom: egret.Rect;
    private rcRight: egret.Rect;
	
	private lblHelp: egret.Label;
	private imgPinger: egret.Image;
	
	private step: number;
	
	private overCallback: Function;
    
    public constructor(overCallback: Function) {
        super();
		
		this.overCallback = overCallback
		
        this.skinName = "resource/custom_skins/blockUISkin.exml";
		
		this.step = 0;
		this.next();
    }
	
	public next(): number {
		this.step ++;
		switch(this.step) {
			case 1:
				return this.renderStep1();
				
			case 2:
				return this.renderStep2();
				
			case 3:
				return this.renderStep3();
				
			case 4:
				return this.renderStep4();
				
			case 5:
				return this.renderStep5();
				
			case 6:
				this.overCallback();
				return 6;
		}
	}
	
	private renderStep1(): number {
		return this.step;
	}

	private renderStep2(): number {
		turn this.step;
	}

	private renderStep3(): number {
		turn this.step;
	}
	
	private renderStep4(): number {
		turn this.step;
	}
	
	private renderStep5(): number {
		return this.step;
	}	
}