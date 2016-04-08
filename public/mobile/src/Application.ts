module application {
    var _main: Main;
    export var router: Router;
    export var dao: Dao;
    export var account: Account;
    export var customer: Customer;

    export function init(main:Main) {
		_main = main;
		
		router = new Router(main);
		dao = new Dao("http://headlines.leanapp.cn/api/");
        
        account = new Account();
        customer = new Customer();
    }
    
    export function login(token:string, cb:Function) {
		dao.rest("login", token, (succeed: bool, data: any) => {
			if (succeed) {
				account.set(data);
				dao.fetch("Customer", {"id": application.account.customer_id}, {}, (succeed: bool, data: any) => {
					if (succeed) {
						customer.set(data[0]);
						_main.dispatchEvent(GameEvents.EVT_LOGIN_IN_SUCCESS);
					} else {
						Toast.launch("获取用户信息失败");
					}
				});
			} else {
				Toast.launch("获取账号信息失败");
			}
		});
	}
}