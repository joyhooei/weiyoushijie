/**
 * Created by yjtx on 15-10-19.
 */

class Login extends egret.EventDispatcher{
    constructor() {
        super();
    }

    login(data?:string|nest.user.LoginCallbackInfo):void {
        if (data == null || typeof data == "string") {
            var loginInfo: nest.user.LoginInfo = data ? {"loginType":<string>data} : {};
            egret.log(JSON.stringify(loginInfo));
            nest.user.login(loginInfo, this.onLoginCallback.bind(this));
        } else {
            this.onLoginCallback(<nest.user.LoginCallbackInfo>data);
        }
    }

    private onLoginCallback(data:nest.user.LoginCallbackInfo):void{
        egret.log(JSON.stringify(data));
        if (data.result == 0){
			//从后台获取用户信息
			application.login(data.token);
        } else{
            Toast.launch("登录失败");
        }
    }
}