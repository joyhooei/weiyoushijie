class GuideUI extends eui.Component {
    private imgBack: eui.Image;

    //用4个矩形围成这样一个中空的形状，调整4个矩形的位置宽高，使得中空的矩形是你需要暴露的UI界面区域。
    private rcTop: egret.Rectangle;
    private rcMiddle: egret.Rectangle;
    private rcBottom: egret.Rectangle;
    private rcRight: egret.Rectangle;
	
	private imgSpeak: eui.Image;
    private imgFinger: eui.Image;
	private imgBonus: eui.Image;
    private imgBg: eui.Image;	
    private imgFocus: eui.Image;
    
	private step: number;
	
	private click: number;
	
	private overCallback: Function;
    
    public constructor() {
        super();
		
		this.step = 0;
	
        this.skinName = "resource/custom_skins/guideUISkin.exml";
		
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this.over();
        },this);
		
		application.stopwatch.addEventListener("second", this.animateFinger, this);
		
		this.imgBonus.visible = false;	
    }
	
	private animateFinger(event:egret.Event) {
		if (event.data % 2 == 0) {
			if (this.imgFinger.source  == "guideconti_png") {
				this.imgFinger.y -= 10;
			} else {
				this.imgFinger.x -= 10;
			}
		} else {
			if (this.imgFinger.source  == "guideconti_png") {
				this.imgFinger.y += 10;
			} else {
				this.imgFinger.x += 10;
			}
		}	
	}
	
	public setOverCallback(ocb: Function) {
        this.overCallback = ocb;
	}
	
	public next(): void {
		switch(this.step) {
			case 1:
				this.click ++;
				if (this.click == 5) {
					this.step ++;
					break;
				} else {
					return;
				}
				
			default:
				this.step ++;
				break;
		}
		
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
				this.renderStep6();
				break;
				
			case 7:
				this.renderStep7();
				break;
							
			case 8:
				this.renderStep8();
				break;
		}
	}
	
	//点击美女
	private renderStep1(): void {
		this.click = 0;
		
		this.imgSpeak.source = "G1_png";
		this.imgFocus.source  = "highlight1_png";
		
        this.renderBlock(0,0,480,800);
		
		this.imgFinger.x = 345;
		this.imgFinger.y = 281;
		this.imgFocus.x = 78;
		this.imgFocus.y = 315;
		this.imgSpeak.x = 151;
		this.imgSpeak.y = 607;
		this.imgBg.x = 0;
		this.imgBg.y = 253;		
	}

	//购买运营
	private renderStep2(): void {
        this.imgSpeak.source  = "G2_png";
		this.imgFocus.source  = "highlight2_png";
		
        this.renderBlock(0,0,480,800);
		
		this.imgFinger.x = 308;
		this.imgFinger.y = 377;
		this.imgFocus.x = 206;
		this.imgFocus.y = 394;
		this.imgSpeak.x = 140;
		this.imgSpeak.y = 601;		
	}

	//升级运营
	private renderStep3(): void {
        this.imgSpeak.source  = "G3_png";
	}
	
	//拍卖
	private renderStep4(): void {
        this.renderBlock(0,0,480,800);
        this.imgSpeak.source  = "G4_png";
		this.imgFocus.source  = "highlight3_png";
		
		this.imgFinger.x = 155;
		this.imgFinger.y = 671;
		this.imgFocus.x = 74;
		this.imgFocus.y = 702;
		this.imgSpeak.x = 139;
		this.imgSpeak.y = 597;	
	}
	
	//滑动投标金币
	private renderStep5(): void {
        this.renderBlock(0,0,480,800);
        this.imgSpeak.source  = "G5_png";
		
		this.imgFinger.x = 44;
		this.imgFinger.y = 300;
		this.imgFocus.x = -34;
		this.imgFocus.y = 325;
		this.imgSpeak.x = 138;
		this.imgSpeak.y = 505;
		this.imgBg.x = 0;
		this.imgBg.y = 423;		
	}
	
	//投标
	private renderStep6(): void {
        this.renderBlock(0,0,480,800);
        this.imgSpeak.source  = "G6_png";
		this.imgFocus.source  = "highlight1_png";
		
		this.imgFinger.x = 226;
		this.imgFinger.y = 536;
		this.imgFocus.x = 4;
		this.imgFocus.y = 537;
		this.imgSpeak.x = 138;
		this.imgSpeak.y = 390;
		this.imgBg.x = 0;
		this.imgBg.y = 316;		
	}
	
	//总结
	private renderStep7(): void {
        this.imgSpeak.source  = "G7_png";
		this.imgFinger.source  = "guideconti_png";
		this.imgFocus.visible = false;
		
        this.renderBlock(0,0,480,800);
		
		this.imgFinger.x = 395;
		this.imgFinger.y = 679;
		this.imgSpeak.x = 138;
		this.imgSpeak.y = 599;
		this.imgBg.x = 0;
		this.imgBg.y = 523;
		
		this.imgFinger.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			this.next();
        }, this);
	}
	
	//获取奖励
	private renderStep8(): void {
        this.imgSpeak.source  = "G8_png";
		this.imgFinger.visible = false;
		this.imgBonus.visible  = true;
						
		this.renderBlock(0, 0, 480, 800);
		
		this.imgBonus.x = 376;
		this.imgBonus.y = 653;
		
		this.imgBonus.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function() {
			application.customer.metal += 1;
			application.customer.diamond += 500;
			
			application.saveCustomer();
			
			this.over();
        }, this);
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
		
		application.stopwatch.removeEventListener("second", this.animateFinger, this);
		
		if (this.overCallback) {
			this.overCallback();
		}	
	}
}