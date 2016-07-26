class Channel51H5 extends Channel{
	public appId: string = "";
	
	constructor(standalone:boolean) {
        super(standalone);
    }
    
    public loginQuietly(): Q.Promise<any> {
        let self = this;

		if (egret.getOption("code")) {
			application.dao.rest("login",{ token: egret.getOption("code"), wysj_channel: "51h5" }).then(function(account){
            	self.resolve(account);
            }, function(error) {
                self.reject("登录失败");
            });
	                            
			return self.promise();
		} else {
			return self.rejectedPromise();
		}
	}
    
    public login(): Q.Promise<any> {
        let self = this;
        
        location.href = 'http://web.51h5.com/sso.html?appid=' + this.appId 
        				+ '&redirect=' + encodeURIComponent(application.baseUrl + "?wysj_channel=51h5");
		
        return self.promise();
	}
	
    public pay(options: any): Q.Promise<any> {
        let self = this;
		
		
        return self.promise();
	}
	
    public share(options:any): Q.Promise<any> {
        let self = this;

		
        return self.promise();
    }
    
    public attention(options:any): Q.Promise<any> {
        let self = this;
		
		
        return self.promise();
	}

    public track(category: string,action?: string,opt_label?: string,opt_value?: number) {
        super.track(category,action,opt_label,opt_value);

        switch(category) {
            case TRACK_CATEGORY_PLAYER:
                if(action == TRACK_ACTION_ENTER) {
                } else {
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
