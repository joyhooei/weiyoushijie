const CHANNEL_1758_IN_EGRET = "10016";
const CHANNEL_HUHUH5 = "HUHUH5";
const CHANNEL_51H5 = "HUHUH5";

declare var loadfile;

class Channel {
	static create(): Channel {
		let cid = egret.getOption("channelId") || egret.getOption("egret.runtime.spid") || egret.getOption("wysj_channel") || "egret";
		
        if(cid === CHANNEL_1758_IN_EGRET) {
			console.info("using channel 1758");
			return new Channel1758(true);
        } else if(cid === CHANNEL_HUHUH5) {
			console.info("using channel huhuh5");
			return new ChannelHuhuh5(false);
        } else if(cid === CHANNEL_51H5) {
			console.info("using channel huhuh5");
			return new Channel51h5(false);
		} else {
			console.info("using default channel");
            return new ChannelEgret();
		}
	}
	
    private _deferred: Q.Deferred<any>;
	
	constructor() {
		this._deferred = null;
    }
	
	public loadjs(url:string) {
		loadfile(url, "js");
	}
    
    public promise() {
        if (this._deferred) {
            this._deferred.reject("操作超时");
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
    
    public track(category:string, action:string, opt_label:string, opt_value:number) {
    }
}