const CHANNEL_1758    = "10016";
const CHANNEL_7K7K    = "";

class Channel {
	static create(): Channel {
		let cid = egret.getOption("channelId");
		
		if (cid === CHANNEL_1758) {
			console.info("using channel 1758");
			return new Channel1758();
		} else {
			console.info("using default channel");
            return new Channel();
		}
	}
	
    private _deferred: Q.Deferred<any>;
	
	constructor() {
    }
    
    public promise() {
        if (this._deferred) {
            this._deferred.reject(new Error("操作超时"));
        }
        
        this._deferred = Q.defer<any>();
        return this._deferred.promise;        
    }
    
    public resolve(data?:any) {
        if (this._deferred) {
            this._deferred.resolve(data);
        }
        
        this._deferred = null;
    }

    public reject(data?: any) {
        if(this._deferred) {
            this._deferred.reject(data);
        }

        this._deferred = null;
    }
    
    public login(): Q.Promise<any> {
        let self = this;
        
 		nest.easyuser.startup({ egretAppId: 90359,version: 2,debug: true },function(result: nest.core.ResultCallbackInfo) {
			if(result.result == 0) {
				var loginTypes: Array<nest.easyuser.ILoginType> = nest.easyuser.getLoginTypes();
				if (loginTypes.length > 0) {
					//需要显示对应的登录按钮
					var loginView: LoginUI = new LoginUI(loginTypes,function(logType: nest.easyuser.ILoginType) {
						nest.easyuser.login(logType, function (data:nest.user.LoginCallbackInfo) {
							if (data.result == 0) {
                                self.resolve(data);
							} else {
                                self.reject("登录失败");
							}
						});
					});

					application.showUI(loginView);
				} else {
					//不需要登录按钮，直接调用登录进游戏
					nest.easyuser.login({}, function (data:nest.user.LoginCallbackInfo) {
						if (data.result == 0) {
                            self.resolve(data);
						} else {
                            self.reject("登录失败");
						}
					});
				}
			} else {
                self.reject("初始化失败");
			}
		});
		
        return self.promise();
	}
	
    public pay(options: any): Q.Promise<any> {
        let self = this;
		
		nest.iap.pay(options, function(data) {
			if(data.result == 0) {
                self.resolve(data);
			} else if(data.result == -1) {
                self.reject("用户取消了支付");
			} else {
                self.reject("支付失败");
			}
		})
		
        return self.promise();
	}
	
    public share(options:any): Q.Promise<any> {
        let self = this;

        nest.share.isSupport({}, function (data) {
			if (data.share == 1) {
				nest.share.share(options, function (data) {
					if(data.result == 0) {
                        self.resolve("");
					} else if(data.result == -1) {
                        self.reject("取消了分享");
					} else {
                        self.reject("分享失败");
					}
				})
			} else {
                self.reject("当前平台不支持分享");
			}
		})
		
        return self.promise();
    }
    
    public attention(options:any): Q.Promise<any> {
        let self = this;
		
        nest.app.isSupport({}, function (data) {
			if (data.attention == 1) {
                nest.app.attention({}, function (data) {
					if(data.result == 0) {
                        self.resolve();
					} else if(data.result == -1) {
                        self.reject("取消了关注");
					} else {
                        self.reject("关注失败");
					}
				})
			} else {
				self.reject("当前平台不支持关注");
			}
		})
		
        return self.promise();
	}
}