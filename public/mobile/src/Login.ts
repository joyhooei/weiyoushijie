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
			application.dao.rest(application.baseUrl, "login", data.token, (succeed: bool, data: any) => {
				if (succeed) {
					application.account.set(data);
					application.dao.fetch(new Customer({id:application.account.customer_id}), (succeed: bool, data: any) => {
						if (succeed) {
							application.customer.set(data);
							application.dispatchEvent(GameEvents.EVT_LOGIN_IN_SUCCESS);
						} else {
							Toast.launch("获取用户信息失败");
						}
					});
				} else {
					Toast.launch("获取账号信息失败");
				}
        	});
        } else{
            Toast.launch("登录失败");
        }
    }
}