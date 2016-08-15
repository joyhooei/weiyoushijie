class Dao extends egret.EventDispatcher {
    private _url: string;

    constructor(url: string) {
        super();
        
        this._url = url;
    }
	
	public fetch(model:string, conditions:{}, filters?:{}): Q.Promise<any[]> {
		conditions = conditions || {};
        
        filters = filters || {};
        
		return this.rest("select/" + model, {conditions: conditions, filters: filters});
	}
	
	public save(model:string, data:any): Q.Promise<any> {
    	let self = this;

        data.game = application.game;
        
        if(data.id){
			var promise = this.rest("update/" + model + "/" + data.id, data);
		} else {
			var promise = this.rest("create/" + model, data);
		}
		
		promise.then(function(d){
			data = d;
			
			self.dispatchEventWith(model, true, data);
		}, function(error){
			Toast.launch(error);
		});
		
		return promise;
	}
    
    public rest(method: string, data: {}): Q.Promise<any> {
        return this.restWithUrl(this._url + method + "?game=" + application.game + "&token=" + application.token, data);
    }
    
    public restWithUrl(url: string, data: {}): Q.Promise<any> {
        let self = this;
        
    	return Q.Promise<any>(function(resolve, reject, notify) {
			var request = new egret.HttpRequest();
			request.responseType = egret.HttpResponseType.TEXT;
			
			//设置为 POST 请求
            request.open(url, egret.HttpMethod.POST);
			request.setRequestHeader("Content-Type", "application/json");
	
	        request.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
	            var request = <egret.HttpRequest>evt.currentTarget;
	            
                var data;
	            try {
                    data = JSON.parse(request.response);
	            } catch(error){
                    data = request.response;
	            }
                resolve(data);
            },self);
	            
	        request.addEventListener(egret.IOErrorEvent.IO_ERROR,(evt: egret.IOErrorEvent) => {
	            console.error('restWithUrl ' + url + ' failed ' + evt.$target.response);
                reject(evt.$target.response);
            },self);
	        
	        request.addEventListener(egret.ProgressEvent.PROGRESS,(evt: egret.ProgressEvent) => {
	            notify(Math.floor(100 * evt.bytesLoaded / evt.bytesTotal));
            },self);
			
			request.send(JSON.stringify(data));
		});
    }    
}
