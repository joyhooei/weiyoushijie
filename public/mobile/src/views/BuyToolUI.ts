class BuyToolUI extends eui.Component{
    private btnBack:eui.Button;
    private btnBuy:eui.Button;
    
    private _myProject: any;
    private _project: Project;
	private _levelAdded: number;
	
    private _name: string;
	private _price: number;
    
    constructor(name:string, price: number, myProject: any,project: Project, levelAdded: number) {
        super();
        
        this._myProject = myProject;
        this._project = project;
		
		this._levelAdded = levelAdded;
		
        this._name = name;
		this._price = price;
        
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/buyToolUISkin.exml";
    }
	
	private back() {
        this.parent.removeChild(this);
	}

    private uiCompHandler():void {
        this.btnBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.back();
        }, this );
        
        if (application.customer.diamond < this._price) {
			this.btnBuy.enabled = false;
		} else {
			this.btnBuy.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
				if (this._name == "project") {
					this.buyProject();
				} else if (this._name == "time") {
					this.buyTime();
				} else if (this._name == "hit") {
					this.buyHit();
				}
			}, this );
		}
    }
    
	private buyProject(){
    	var self = this;
    	
		let oldOutput = this.output();
		this._myProject.level += this._levelAdded;
		application.dao.save("Project",self._myProject, function(succeed, proj) {
			if (succeed) {
                application.buyOutput(0,self._price, self.output() - oldOutput, self._myProject, function(succeed, c){
					if (succeed) {
						Toast.launch("购买成功");
						
						this.back();
					} else {
						Toast.launch("购买失败");    
					}
				});
			} else {
				Toast.launch("购买失败");
			}
		});
	}
	
	private output(): number {
        return this._project.output(this._myProject.level, this._myProject.achieve, application.customer.prop);
    }
	
	private buyTime(){
        application.customer.diamond -= this._price;
		application.customer.gold += application.customer.output * 3600 * 48;
		application.dao.save("Customer", application.customer, function(succeed, data){
			Toast.launch("购买了时光沙漏");

			application.refreshCustomer(application.customer.output * 3600 * 48, -500, 0, 0, null);
			
			this.back();
		});
	}
	
	private buyHit() {
        application.customer.diamond -= this._price;
		application.customer.total_hits = 3;
		application.dao.save("Customer", application.customer, function(succeed, data){
			Toast.launch("购买了爆击");

			application.refreshCustomer(0, -100, 3, 0, null);
			
			this.back();
		});
	}
}