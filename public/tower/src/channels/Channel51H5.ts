class Channel51H5 extends Channel{
    public appId: string = "fg40249b";
	
	constructor(standalone:boolean) {
        super(standalone);
    }
    
    public loginQuietly(): Q.Promise<any> {
        let self = this;

		if (egret.getOption("code")) {
			self.rest("51h5", "login",{ token: egret.getOption("code")}).then(function(account){
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
        				+ '&redirect=' + encodeURIComponent(application.baseUrl + "/headline/bin-release/web/bin-release/index.html?wysj_channel=51h5");
		
        return self.promise();
	}
	
    public pay(options: any): Q.Promise<any> {
        let self = this;
        
        options.customerId = application.me.attrs.id;
		self.rest("51h5", "51h5_pay_url", options).then(function(pay_url){
        	location.href = pay_url;
        }, function(error) {
            self.reject("支付失败");
        });	
        
        return self.promise();
	}
}
