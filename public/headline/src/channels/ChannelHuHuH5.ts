declare var h5Game;

window['huhuh5_loginCallBcak'] = function(userId, userName, userImage, userPosition, token){
	let channel = application.channel;
    channel.rest("huhuh5", "login",{ token: token, userId: userId, userName: userName, userImage: userImage, userPosition: userPosition}).then(function(account){
    	channel.resolve(account);
    }, function(error) {
    	channel.reject("登录失败");
    });
};

window['huhuh5_shareCallBcak'] = function(){
    application.channel.resolve();
};

window['huhuh5_payCallBcak'] = function(orderId, status){
	let channel = application.channel;
    if (status == 'SUCCESS') {
        channel.resolve();
	} else if(status == 'CANCEL') {
        channel.reject("取消了支付");
	} else {
        channel.reject("支付失败");
	}
};

class ChannelHuHuH5 extends Channel{
	constructor(standalone:boolean) {
        super(standalone);
        
        this.loadjs('http://server.huhuh5.com:8081/3HGame/jsFile/h5Game.js');
    }
    
    public openScreen(stage:egret.Stage): void {
    	try {
    		h5Game.openScreen (false);
    	} catch(error) {
    		Utility.delay(function(){
    			application.channel.openScreen(stage);
    		}, 100);
    	}
    }
    
    public setOpenScreenProgress(progress:number, total:number, title:string): void {
    	h5Game.progress(progress, total, title);
    }
    
    public login(): Q.Promise<any> {
        let self = this;
        
        h5Game.login('huhuh5_loginCallBcak')
		
        return self.promise();
	}
	
    public pay(options: any): Q.Promise<any> {
        let self = this;
       
        var data = {
            goodsId:   options.goodsId,
            goodsName: options.goodsName,
            goodsNum:  options.goodsNumber,
            money:     options.money,
            orderId:   options.orderId,
        };
        h5Game.pay(data, 'huhuh5_payCallBcak')
		
        return self.promise();
	}
	
    public share(options:any): Q.Promise<any> {
        let self = this;
        
        h5Game.share("huhuh5_shareCallBcak");
		
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
