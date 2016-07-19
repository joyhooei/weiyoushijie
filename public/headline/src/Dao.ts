class Dao extends egret.EventDispatcher {
    private _url: string;
    private _game: string;
    
    constructor(url: string, game: string) {
        super();
        
        this._url = url;
        this._game = game;
    }
	
	public fetch(model:string, conditions:{}, filters?:{}): Q.Promise<any[]> {
		conditions = conditions || {};
        conditions["game"] = this._game;
        
        filters = filters || {};
        
		return this.rest("select/" + model, {conditions: conditions, filters: filters});
	}
	
	public save(model:string, data:any): Q.Promise<any> {
    	let self = this;
    	
        let doUpdate = data.id;

        data.game = this._game;
        
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
		}, function(error){
			Toast.launch(error);
		});
		
		return promise;
	}
    
    public rest(method: string, data: {}): Q.Promise<any> {
        let self = this;
        
    	return Q.Promise<any>(function(resolve, reject, notify) {
			var request = new egret.HttpRequest();
			request.responseType = egret.HttpResponseType.TEXT;
			
			//设置为 POST 请求
            request.open(self._url + method + "?game=" + self._game + "&token=" + application.token, egret.HttpMethod.POST);
			request.setRequestHeader("Content-Type", "application/json");
	
	        request.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
	            var request = <egret.HttpRequest>evt.currentTarget;
	            	
	            resolve(JSON.parse(request.response));
            },self);
	            
	        request.addEventListener(egret.IOErrorEvent.IO_ERROR,(evt: egret.IOErrorEvent) => {
                reject(evt.$target.response);
            },self);
	        
	        request.addEventListener(egret.ProgressEvent.PROGRESS,(evt: egret.ProgressEvent) => {
	            notify(Math.floor(100 * evt.bytesLoaded / evt.bytesTotal));
            },self);
			
			request.send(JSON.stringify(data));
		});
    }
}
