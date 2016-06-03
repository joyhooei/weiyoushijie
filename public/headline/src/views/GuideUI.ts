class GuideUI extends eui.Component {
    private imgBack: eui.Image;

    //用4个矩形围成这样一个中空的形状，调整4个矩形的位置宽高，使得中空的矩形是你需要暴露的UI界面区域。
    private rcTop: egret.Rectangle;
    private rcMiddle: egret.Rectangle;
    private rcBottom: egret.Rectangle;
    private rcRight: egret.Rectangle;
	
	private lblHelp: eui.Label;
    private imgFinger: eui.Image;
	
	private step: number;
	
	private overCallback: Function;
	
	private timer: egret.Timer;
    
    public constructor() {
        super();
		
		this.step = 0;
	
        this.skinName = "resource/custom_skins/guideUISkin.exml";
		
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.over();
        },this);
		
		this.timer = new egret.Timer(1000, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, function(event:egret.TimerEvent){
			if (((<egret.Timer>event.target).currentCount) % 2 == 0) {
				this.imgFinger.x -= 10;
			} else {
				this.imgFinger.x += 10;
			}
		}, this);

		this.timer.start();		
    }
	
	public setOverCallback(ocb: Function) {
        this.overCallback = ocb;
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
		this.renderBlock(200, 200, 200, 200);
	}

	private renderStep2(): void {
    	this.renderBlock(100,0,200,200);
	}

	private renderStep3(): void {
        this.renderBlock(0,300,200,200);
	}
	
	private renderStep4(): void {
        this.renderBlock(330,300,200,200);
	}
	
	private renderStep5(): void {
        this.renderBlock(340,300,200,200);
	}
	
	private renderBlock(x: number, y: number, width: number, height: number): void {		
		this.rcRight.x = x + width;
		this.rcRight.y = 0;
		this.rcRight.height = 800;
		this.rcRight.width = 480 - this.rcRight.x;
		
		this.rcTop.x = this.rcTop.y = 0;
		this.rcTop.height = y;
		this.rcTop.width = this.rcRight.x;
		
		this.rcMiddle.x = 0;
		this.rcMiddle.y = y;
		this.rcMiddle.width = y;
		this.rcMiddle.height = height;
		
		this.rcBottom.x = 0;
		this.rcBottom.y = y + height;
		this.rcBottom.width = this.rcTop.width;
		this.rcBottom.height = this.rcRight.height - y - height;
	}
	
	private over(): void {
		application.hideUI(this);
		application.guideUI = null;
		
		this.timer.stop();
		
		if (this.overCallback) {
			this.overCallback();
		}	
	}
}