module application {
    export var main: Main;
    export var router: Router;
    export var dao: Dao;
    export var account: any;
    export var customer: any;

    export function init(main:Main) {
		application.main = main;
		
        application.router = new Router(main);
        application.dao = new Dao("http://headlines.leanapp.cn/api/");
        //application.dao = new Dao("http://localhost:3000/api/");
    }
	
    export function login(data?:string|nest.user.LoginCallbackInfo):void {
        if (data == null || typeof data == "string") {
            var loginInfo: nest.user.LoginInfo = data ? {"loginType":<string>data} : {};
            egret.log(JSON.stringify(loginInfo));
			
            nest.user.login(loginInfo, application.onLoginCallback);
        } else {
            application.onLoginCallback(<nest.user.LoginCallbackInfo>data);
        }
    }

    export function onLoginCallback(data:nest.user.LoginCallbackInfo):void{
        egret.log(JSON.stringify(data));
		
        if (data.result == 0){
			//从后台获取用户信息
			application.dao.rest("login", {token: data.token}, (succeed: boolean, data: any) => {
				if (succeed) {
					application.account = data;
					application.dao.fetch("Customer", {"id": application.account.customer_id}, {}, (succeed: boolean, data: any) => {
						if (succeed) {
							application.customer = data[0];

							application.main.dispatchEventWith(GameEvents.EVT_LOGIN_IN_SUCCESS);
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