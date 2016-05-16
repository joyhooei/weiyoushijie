module application {
    export var main: Main;
    export var router: Router;
    export var dao: Dao;
    export var customer: any;
    export var projects: Project[];

    export function init(main:Main) {
		application.main = main;
		
        application.router = new Router(main);
        application.dao = new Dao("http://headlines.leanapp.cn/api/");
        //application.dao = new Dao("http://localhost:3000/api/");
        
        application.projects = Project.createAllProjects();
    }
	
    export function login(data?:string|nest.user.LoginCallbackInfo):void {
        if (data == null || typeof data == "string") {
            var loginInfo: nest.user.LoginInfo = data ? {"loginType":<string>data} : {};
            nest.user.login(loginInfo, application.onLoginCallback);
        } else {
            application.onLoginCallback(<nest.user.LoginCallbackInfo>data);
        }
    }

    export function onLoginCallback(data:nest.user.LoginCallbackInfo):void{
        //从后台获取用户信息
        application.dao.rest("login", {token: data.token}, (succeed: boolean, data: any) => {
            if (succeed) {
                application.customer = data;
                application.main.dispatchEventWith(GameEvents.EVT_LOGIN_IN_SUCCESS);
            } else {
                Toast.launch("获取账号信息失败");
            }
        });
    }
    
    export function refreshCustomer(goldAdded:number, diamondAdded: number, outputAdded:number, totalHitsAdded:number, projAdded:any) {
        application.main.homeUI.animateCustomer(goldAdded, diamondAdded, outputAdded, totalHitsAdded, projAdded);
    }
    
    export function fetchCustomer() {
        application.dao.fetch("Customer", {id: application.customer.id}, {}, function(succeed, customers) {
            if (succeed && customers.length > 0) {
                application.customer = customers[0];
                
                application.refreshCustomer(application.customer.gold, application.customer.diamond, application.customer.output, 0, null);
            }
        });
    }
    
    export function buyOutput(gold:number, diamond: number, output:number, proj:any, cb: Function): void {
        application.customer.gold      -= gold;
        application.customer.diamond   -= diamond;
        application.customer.output    += output;
        application.dao.save("Customer", application.customer, function(succeed, c){
            if (succeed) {
                application.refreshCustomer(0 - gold, 0 - diamond, output, 0, proj);
            }
			
			cb(succeed, c);
        });
    }
    
    export function format(d:number): string {
        let units = [
                'k', 'm', 'b', 't', 
                'a', 'A', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'l', 'L', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',
                'aa', 'AA', 'cc', 'CC', 'dd', 'DD', 'ee', 'EE', 'ff', 'FF', 'gg', 'GG', 'hh', 'HH', 'ii', 'II', 'jj', 'JJ', 'll', 'LL', 'nn', 'NN', 'oo', 'OO', 'pp', 'PP', 'qq', 'QQ', 'rr', 'RR', 'ss', 'SS', 'uu', 'UU', 'vv', 'VV', 'ww', 'WW', 'xx', 'XX', 'yy', 'YY', 'zz', 'ZZ',
            ];
            
        let unit:string  = "";
        for (var i = 0; i < units.length; i++) {
            if (d < 10) {
                return d.toFixed(2) + unit;
            } else if (d < 100) {
                return d.toFixed(1) + unit;
            } else if (d < 1000) {
                    return d.toFixed() + unit;
            } else {
                unit = units[i];
                d = d / 1000;
            }
        }
        
        return d.toFixed() + unit;
    }

}