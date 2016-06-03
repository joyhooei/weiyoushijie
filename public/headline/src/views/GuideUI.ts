class GuideUI extends eui.Component {
    private imgBack: eui.Image;

    //用4个矩形围成这样一个中空的形状，调整4个矩形的位置宽高，使得中空的矩形是你需要暴露的UI界面区域。
    private rcTop: egret.Rect;
    private rcMiddle: egret.Rect;
    private rcBottom: egret.Rect;
    private rcRight: egret.Rect;
	
	private lblHelp: egret.Label;
	private imgPinger: egret.Image;
	
	private step: number;
	
	private overCallback: Function;
    
    public constructor() {
        super();
	
        this.skinName = "resource/custom_skins/blockUISkin.exml";
		
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.over();
        },this);
		
		this.step = 0;
		this.next();
    }
	
	public setOverCallback(ocb: Function) {
		this.overCallback = overCallback;
	}
	
	public next(): void {
		this.step ++;
		switch(this.step) {
			case 1:
				this.renderStep1();
				break;
				
			case 2:
				this.renderStep2();
				break;
				
			case 3:
				this.renderStep3();
				break;
				
			case 4:
				this.renderStep4();
				break;
				
			case 5:
				this.renderStep5();
				break;
				
			case 6:
				this.over();
				break;
		}
	}
	
	private renderStep1(): void {
	}

	private renderStep2(): void {
	}

	private renderStep3(): void {
	}
	
	private renderStep4(): void {
	}
	
	private renderStep5(): void {
	}
	
	private over(): void {
		application.hideUI(this);
		if (this.overCallback) {
			this.overCallback();
		}	
	}
}