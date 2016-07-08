const CHANNEL_EGRET   = "egret";
const CHANNEL_1758    = "1758";
const CHANNEL_7K7K    = "";

declare var loadfile;

class Channel {
	static create(): Channel {
		let cid = egret.getOption("channelId") || egret.getOption("wysj_channel") || "egret";
		
		if (cid === CHANNEL_1758) {
			console.info("using channel 1758");
			return new Channel1758();
		} else {
			console.info("using default channel");
            return new ChannelEgret();
		}
	}
	
    private _deferred: Q.Deferred<any>;
	
	public name: string;
	
	constructor(name:string) {
		this.name = name;
		this._deferred = null;
    }
	
	public loadjs(url:string) {
		loadfile(url, "js");
	}
    
    public promise() {
        if (this._deferred) {
            this._deferred.reject(new Error("操作超时"));
        }
        
        this._deferred = Q.defer<any>();
        return this._deferred.promise;        
    }
	
	public resolvedPromise() {
        var promise = this.promise();
		this._deferred.resolve();
        return promise;  		
	}
	
	public rejectedPromise() {
        var promise = this.promise();
		this._deferred.reject("目前不支持");
        return promise;  		
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
        return this.rejectedPromise();
	}
	
    public pay(options: any): Q.Promise<any> {
        return this.rejectedPromise();
	}
	
    public share(options:any): Q.Promise<any> {
        return this.rejectedPromise();
    }
    
    public attention(options:any): Q.Promise<any> {
        return this.rejectedPromise();
	}
}