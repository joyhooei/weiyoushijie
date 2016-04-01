/**
 *
 * @author 
 *
 */
class LoginUI extends eui.Component implements nest.easeuser.ILoginCallbacks{
    public info_txt: egret.gui.Label;
    
    public login_button: egret.gui.Button;
    public quickTest_btn: egret.gui.Button;
  
    public constructor() {
        super();
      
        this.skinName = = "resource/custom_skins/loginUISkin.exml";
	  }
	
	  public createChildren(){
        super.createChildren();  
      
        this.login_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTapHandler,this);   
        this.quickTest_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onQuickTestHandler,this);   
	  }
	
	  private onQuickTestHandler(e:egret.TouchEvent):void {
        utils.changeView(new QuickTestView());
	  }
	
	  private onTouchTapHandler(e:egret.TouchEvent):void{
        var self = this;
        nest.core.startup({egretAppId : 88888, version : 2, debug:true}, function(resultInfo:nest.core.ResultCallbackInfo) {
            if (resultInfo.result == 0) {
                self.checkLogin();
            }
        });
	  }

    public onCreate = (data: nest.easeuser.ILoginTypes):void =>  {
        utils.changeView(new LoginTypeView(data));
    };

    public onSuccess = (data: nest.user.LoginCallbackInfo):void => {
        new Login().login(data);
    };

    public onFail = (data: nest.core.ResultCallbackInfo):void => {
        egret.log("log Fail");
    };

	  private checkLogin():void{
        egret.log("checkLogin start");

        nest.easeuser.login(this);
	  }
}