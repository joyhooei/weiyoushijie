const CHANNEL_1758    = "";
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
	
	constructor() {
    }
	
	public function login(options:any): Q.Promise<any> {
		let self = this;
		
		let deferred = Q.defer<any>();
		
		nest.easyuser.startup({ egretAppId: 90359,version: 2,debug: true },function(resultInfo: nest.core.ResultCallbackInfo) {
			if(resultInfo.result == 0) {
				var loginTypes: Array<nest.easyuser.ILoginType> = nest.easyuser.getLoginTypes();
				if (loginTypes.length > 0) {
					//需要显示对应的登录按钮
					var loginView: LoginUI = new LoginUI(loginTypes,function(logType: nest.easyuser.ILoginType) {
						nest.easyuser.login(logType, function (data:nest.user.LoginCallbackInfo) {
							if (data.result == 0) {
								self._login(data, deferred);
							} else {
								deferred.reject("登录失败");
							}
						});
					});

					application.showUI(loginView);
				} else {
					//不需要登录按钮，直接调用登录进游戏
					nest.easyuser.login({}, function (data:nest.user.LoginCallbackInfo) {
						if (data.result == 0) {
							self._login(data, deferred);
						} else {
							deferred.reject("登录失败");
						}
					});
				}
			}
		});
		
		return deferred.promise;
	}
	
	private function _login(data?:string|nest.user.LoginCallbackInfo, deferred:Q.defer<any>):void {
		if (data == null || typeof data == "string") {
			var loginInfo: nest.user.LoginInfo = data ? {"loginType":<string>data} : {};
			nest.user.login(loginInfo, function(d:nest.user.LoginCallbackInfo){
				deferred.resolve(d);
			});
		} else {
			deferred.resolve(<nest.user.LoginCallbackInfo>data);
		}	
	}
	
	public function pay(options:any): Q.Promise<any> {
		let deferred = Q.defer<any>();
		
		nest.iap.pay(options}, function(data) {
			if(data.result == 0) {
				deferred.resolve(data);
			} else if(data.result == -1) {
				deferred.reject("用户取消了支付");
			} else {
				deferred.reject("支付失败");
			}
		})
		
		return deferred.promise;
	}
	
    public function share(options:any): Q.Promise<any> {
        let deferred = Q.defer<any>();
		
        nest.share.isSupport({}, function (data) {
			if (data.share == 1) {
				nest.share.share(options, function (data) {
					if(data.result == 0) {
						deferred.resolve("");
					} else if(data.result == -1) {
						deferred.reject("取消了分享");
					} else {
						deferred.reject("分享失败");
					}
				})
			} else {
				deferred.reject("当前平台不支持分享");
			}
		})
		
		return deferred.promise;
    }
    
    public function attention(options:any): Q.Promise<any> {
        let deferred = Q.defer<any>();
		
        nest.app.isSupport({}, function (data) {
			if (data.attention == 1) {
                nest.app.attention({}, function (data) {
					if(data.result == 0) {
						deferred.resolve();
					} else if(data.result == -1) {
						deferred.reject("取消了关注");
					} else {
						deferred.reject("关注失败");
					}
				})
			} else {
				deferred.reject("当前平台不支持关注");
			}
		})
		
		return deferred.promise;
	}
}