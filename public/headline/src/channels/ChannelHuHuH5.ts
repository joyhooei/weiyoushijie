declare var h5Game;

class ChannelHuHuH5 extends Channel{
	constructor(standalone:boolean) {
        super(standalone);
        
        this.loadjs('http://server.huhuh5.com:8081/3HGame/jsFile/h5Game.js');
    }
    
    public openScreen(stage:egret.Stage): void {
    	h5Game.openScreen (false);
    }
    
    public setOpenScreenProgress(progress:number, total:number, title:string): void {
    	h5Game.progress(progress, total, title);
    }
    
    public login(): Q.Promise<any> {
        let self = this;

        window['loginCallBcak'] = function(userId, userName, userImage, userPosition, token){
            application.dao.rest("login",{ token: token, wysj_channel: "huhuh5", userId: userId, userName: userName, userImage: userImage, userPosition: userPosition}).then(function(account){
            	self.resolve(account);
            }, function(error) {
            	self.reject("登录失败");
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
    
    public track(category: string,action?: string,opt_label?: string,opt_value?: number) {
        super.track(category,action,opt_label,opt_value);
        
        switch(category) {
            case TRACK_CATEGORY_PLAYER:
                if(action == TRACK_ACTION_ENTER) {
                	h5Game.gameStart();
                } else {
                	h5Game.setGameStatus();
                }
                return;

            case TRACK_CATEGORY_DIAMOND:
                if(action == TRACK_ACTION_INC) {
                } else {
                }
                return;

            case TRACK_CATEGORY_GOLD:
                if(action == TRACK_ACTION_INC) {
                } else {
                }
                return;

            case TRACK_CATEGORY_ACTIVITY:
                return;

            case TRACK_CATEGORY_GUIDE:
                return;

            case TRACK_CATEGORY_RESOURCE:
                return;
        }
    }
}
