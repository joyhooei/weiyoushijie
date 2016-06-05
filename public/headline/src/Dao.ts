class Dao extends egret.EventDispatcher {
    private _baseUrl: string;
    private _gameName: string;
    
    constructor(baseUrl: string, gameName: string) {
        super();
        
        this._baseUrl = baseUrl;
        this._gameName = gameName;
    }
	
	public fetch(model:string, conditions:{}, filters:{}, cb: Function) {
        if (conditions) {
            conditions["game"] = this._gameName;
        } else {
            conditions = {game: this._gameName};
        }
        
		this.rest("select/" + model, {conditions: conditions, filters: filters}, cb);
	}
	
	public save(model:string, data:any, cb?: Function) {
    	var self = this;
    	
        var _cb = function(succeed:number, result: any) {
            if (succeed) {
                self.dispatchEventWith(model,true, result);
                
                data = result;
            }
            
            if (cb) {
                cb(succeed, result);
            }
        }
        
        data.game = this._gameName;
        
		if (data.id){
			this.rest("update/" + model + "/" + data.id, data, _cb);
		} else {
			this.rest("create/" + model, data, _cb);
		}
	}
    
    public rest(method: string, data: {}, cb: Function) {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		
		//设置为 POST 请求
		request.open(this._baseUrl + method + "?game=" + this._gameName, egret.HttpMethod.POST);
		request.setRequestHeader("Content-Type", "application/json");

        request.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
            var request = <egret.HttpRequest>evt.currentTarget;
            console.log("post data : ",request.response);

            if(cb) {
                cb(true,JSON.parse(request.response));
            }            
        }, this);
            
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,(evt: egret.IOErrorEvent) => {
            if(cb) {
                cb(false,event);
            }       
        }, this);
        
        request.addEventListener(egret.ProgressEvent.PROGRESS,(evt: egret.ProgressEvent) => {
            console.log("post progress : " + Math.floor(100 * evt.bytesLoaded / evt.bytesTotal) + "%");
        },this);
		
		request.send(JSON.stringify(data));
    }
}