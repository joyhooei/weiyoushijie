class ReportUI extends eui.Component{
    private imgCancel:eui.Image;
    private imgOK:eui.Image;
    
    private txtContent:eui.EditableText;
    
    constructor() {
        super();
        
        this.skinName = "resource/custom_skins/reportUISkin.exml";
        
        this.imgCancel.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);
        }, this );        
        
        this.imgOK.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
			if (this.txtContent.text.length > 0) {
				var report = {customer_id: application.customer.id, title: this.txtContent.text, state: 0};
				application.dao.save("Report", report);
				application.hideUI(this);
			} else {
				Toast.launch("请填写错误的内容");
			}
        }, this );        
    }
}