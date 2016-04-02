/**
 *
 * @author 
 *
 */
class LoginUI extends eui.Component implements nest.easeuser.ILoginCallbacks{
    public info_txt: eui.Label;
    
    public login_button: eui.Button;
  
    public constructor() {
        super();
      
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/loginUISkin.exml";
	  }
	
	  private uiCompHandler():void {     
        this.login_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTapHandler,this);   
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
        router.changePage(new LoginTypeUI(data));
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