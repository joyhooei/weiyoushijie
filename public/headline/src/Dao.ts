class Dao extends egret.EventDispatcher {
    private _baseUrl: string;
    private _gameName: string;
    
    constructor(baseUrl: string, gameName: string) {
        super();
        
        this._baseUrl = baseUrl;
        this._gameName = gameName;
    }
	
	public fetch(model:string, conditions:{}, filters?:{}, cb?: Function) {
        if (conditions) {
            conditions["game"] = this._gameName;
        } else {
            conditions = {game: this._gameName};
        }
        
		return this.rest("select/" + model, {conditions: conditions, filters: filters}, cb);
	}
	
	public save(model:string, data:any, cb?: Function) {
    	let self = this;
    	
        let doUpdate = data.id;

        data.game = this._gameName;
        
		if (doUpdate){
			var promise = this.rest("update/" + model + "/" + data.id, data);
			
			self.dispatchEventWith(model, true, data);
		} else {
			var promise = this.rest("create/" + model, data);
		}
		
		promise.then(function(d){
			data = d;
			
			if (!doUpdate) {
				self.dispatchEventWith(model, true, data);
			}

			if (cb) {
				cb(true, result);
			}
		}, function(error){
			Toast.launch(error);

			if (cb) {
				cb(false, error);
			}
		});
		
		return promise;
	}
    
    public rest(method: string, data: {}, cb?: Function) {
    	return Q.Promise(function(resolve, reject, notify) {
			var request = new egret.HttpRequest();
			request.responseType = egret.HttpResponseType.TEXT;
			
			//设置为 POST 请求
			request.open(this._baseUrl + method + "?game=" + this._gameName + "&token=" + application.token, egret.HttpMethod.POST);
			request.setRequestHeader("Content-Type", "application/json");
	
	        request.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
	            var request = <egret.HttpRequest>evt.currentTarget;

	            if(cb) {
	                cb(true,JSON.parse(request.response));
	            }            
	            	
	            resolve(JSON.parse(request.response));
	        }, this);
	            
	        request.addEventListener(egret.IOErrorEvent.IO_ERROR,(evt: egret.IOErrorEvent) => {
	            if(cb) {
	                cb(false, evt.$target.response);
	            }
	            
                reject(evt.$target.response);
	        }, this);
	        
	        request.addEventListener(egret.ProgressEvent.PROGRESS,(evt: egret.ProgressEvent) => {
	            notify(Math.floor(100 * evt.bytesLoaded / evt.bytesTotal));
	        },this);
			
			request.send(JSON.stringify(data));
		});
    }
}
