class Channel {
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
		});
		
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
		});	
		
		return deferred.promise;
	}
}