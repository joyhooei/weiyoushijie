module application {
    export var main: Main;
    export var router: Router;
    export var dao: Dao;
    export var customer: any;
    export var bid: any;
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
        application.dao.rest("login", {token: data.token}, (succeed: boolean, customer: any) => {
            if (succeed) {
                application.customer = customer;
				application.refreshBid(function(bid){
                    application.main.dispatchEventWith(GameEvents.EVT_LOGIN_IN_SUCCESS);
                });
            } else {
                Toast.launch("获取账号信息失败");
            }
        });
    }
    
    export function bidDay(): string {
		//中午12点开标，所以12点之后的投标算明天的
		var dt = new Date();
		if (dt.getHours() >= 12) {
			dt = new Date(dt.getTime() + 24 * 60 * 60 * 1000);
		}
		
		return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    }
    
    export function refreshBid(cb: Function): void {
        application.dao.fetch("Bid",{ succeed: 0, day :application.bidDay(), customer_id: application.customer.id}, {limit : 1}, function(succeed, bids){
            if (succeed && bids.length > 0) {
                application.bid = bids[0];				
            } else {
                application.bid = null;
            }

            cb(application.bid);
        })
    }
    
    export function refreshCustomer(goldAdded:number, diamondAdded: number, outputAdded:number, totalHitsAdded:number, projEdited:any) {
        application.main.homeUI.refresh(goldAdded,diamondAdded,outputAdded,totalHitsAdded,projEdited);
    }

    export function fetchCustomer(): void {

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
    
    export function pay(goodsId:string,order:any,callback:Function): void {
        nest.iap.pay({ goodsId: goodsId,goodsNumber: "1",serverId: "1",ext: order.id },function(data) {
            if(data.result == 0) {
                //支付成功
                callback(1);
            } else if(data.result == -1) {
                //支付取消
                Toast.launch("取消了购买");
            } else {
                //支付失败
                Toast.launch("支付失败");
            }
        })
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