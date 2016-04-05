class Dao {
    private _baseUrl: string;
	
	private _cb: Function;
    
    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
		
		this._cb = null;
    }
	
	public login(token: string, cb: Function) {
		this.rest("login", {token: token}, cb);
	}
	
	public save(model: Model, cb: Function) {
		this.rest("save", {model: model}, cb);
	}
    
    private rest(method: string, data: any, cb: Function) {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.JSON;
		
		//设置为 POST 请求
		request.open(this._baseUrl, egret.HttpMethod.POST);
		request.setRequestHeader("Content-Type", "application/json");

		request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
		request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
		
		this._cb = cb;
		
		request.send(JSON.stringify(data));
    }
	
	private onPostComplete(event:egret.Event):void {
		var request = <egret.HttpRequest>event.currentTarget;
		console.log("post data : ",request.response);
		
		if (this._cb) {
			this._cb(true, request.response);
		}
	}
	
	private onPostIOError(event:egret.IOErrorEvent):void {
		console.log("post error : " + event);
		
		if (this._cb) {
			this._cb(false, event);
		}
	}
	
	private onPostProgress(event:egret.ProgressEvent):void {
		console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
	}	
}