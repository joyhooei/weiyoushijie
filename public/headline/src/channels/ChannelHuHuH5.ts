delclare h5Game;

class ChannelHuHuH5 extends Channel{
	constructor() {
        super();
        
        this.loadjs('http://server.huhuh5.com:8081/3HGame/jsFile/h5Game.js');
    }
    
    public login(): Q.Promise<any> {
        let self = this;

        window['loginCallBcak'] = function(userId, userName, userImage, userPosition, token){
            application.dao.rest("login",{ token: data.token, wysj_channel: "huhuh5", userId: userId, userName: userName, userImage: userImage, userPosition: userPosition},(succeed: boolean,account: any) => {
                if (succeed) {
                    self.resolve(account);
                } else {
                    self.reject("登录失败");
                }
            });
        };
        
        h5Game.login('loginCallBcak')
		
        return self.promise();
	}
	
    public pay(options: any): Q.Promise<any> {
        let self = this;
		
        window['payCallBcak'] = function(orderId, status){
            if (status == 'SUCCESS') {
                self.resolve();
			} else if(status == 'CANCEL') {
                self.reject("取消了支付");
			} else {
                self.reject("支付失败");
			}
        };
        
        var data = {
            goodsId:   options.goodsId,
            goodsName: options.goodsName,
            goodsNum:  options.goodsNumber,
            money:     options.money,
            orderId:   options.orderId,
        };
        h5Game.pay(data, 'payCallBcak')
		
        return self.promise();
	}
	
    public share(options:any): Q.Promise<any> {
        let self = this;

        window['shareCallBcak'] = function(){
            self.resolve();
        };
        
        h5Game.share("shareCallBcak");
		
        return self.promise();
    }
}