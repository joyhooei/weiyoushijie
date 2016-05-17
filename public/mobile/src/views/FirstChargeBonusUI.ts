class FirstChargeBonusUI extends eui.Component{
    private btnCancel:eui.Button;
    private btnCharge:eui.Button;

    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/firstChargeBonusUISkin.exml";
    }

    private uiCompHandler():void {
        var self = this;
        
        this.btnCancel.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            this.parent.removeChild(this);
        }, this );
        
        this.btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			var self = this;

			var order = { customer_id: application.customer.id, product: "diamond", price: 2};
			application.dao.save("Order", order, function(succeed, o) {
				if (succeed) {
					application.pay("3", o, function(succeed){
						if (succeed == 1) {
							Toast.launch("充值成功");
						}
					});

				} else {
					Toast.launch("充值失败");
				}
			});		
        },this);        
    }
}