enum ChannelId {
	CHANNEL_DEFAULT,
    CHANNEL_1758,
    CHANNEL_7K7K,
}

class Channel {
	static create(channelId:ChannelId): Channel {
		if (channelId === ChannelId.CHANNEL_1758) {
			return new Channel1758();
		} else {
			return new Channel();
		}
	}
	
	constructor() {
    }
	
	public function login(options:any): Q.Promise<any> {
		var deferred = Q.defer<any>();
		
        if (options == null || typeof options == "string") {
            var loginInfo: nest.user.LoginInfo = options ? {"loginType":<string>options} : {};
            nest.user.login(loginInfo, function(data:nest.user.LoginCallbackInfo){
				deferred.resolve(data);
			});
        } else {
            deferred.resolve(<nest.user.LoginCallbackInfo>options);
        }
		
		return deferred.promise;
	}
	
	public function pay(options:any): Q.Promise<any> {
		var deferred = Q.defer<any>();
		
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
        var deferred = Q.defer<any>();
		
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
        var deferred = Q.defer<any>();
		
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