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
            //为了保证安全性，这段代码请务必放在服务器端实现
            this.getUserInfo(data, this.onGetUserInfoCallback);
        } else{
            //登录失败
        }
    }

    private getUserInfo(data:nest.user.LoginCallbackInfo,onGetUserInfoCallback:Function){
        //从后台获取用户信息
        
        //进入游戏
    }
}