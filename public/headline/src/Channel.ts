const CHANNEL_1758_IN_EGRET = "10016";
const CHANNEL_HUHUH5 = "HUHUH5";
const CHANNEL_51H5 = "51H5";

const TRACK_CATEGORY_GAME     = "game";
const TRACK_CATEGORY_PLAYER   = "player";
const TRACK_CATEGORY_DIAMOND  = "diamond";
const TRACK_CATEGORY_GOLD     = "gold";
const TRACK_CATEGORY_ACTIVITY = "activity";
const TRACK_CATEGORY_GUIDE    = "guide";
const TRACK_CATEGORY_RESOURCE = "resource";

const TRACK_ACTION_DEC    = "dec";
const TRACK_ACTION_INC    = "inc";
const TRACK_ACTION_JOIN   = "join";
const TRACK_ACTION_LEAVE  = "leave";
const TRACK_ACTION_START  = "start";
const TRACK_ACTION_STOP   = "stop";
const TRACK_ACTION_LOAD   = "load";

declare var loadfile;

class Channel {
	static create(): Channel {
		let cid = egret.getOption("channelId") || egret.getOption("egret.runtime.spid") || egret.getOption("wysj_channel") || "egret";
		
        if(cid === CHANNEL_1758_IN_EGRET) {
			console.info("using channel 1758");
			return new Channel1758(false);
        } else if(cid === CHANNEL_HUHUH5) {
			console.info("using channel huhuh5");
			return new ChannelHuHuH5(true);
        } else if(cid === CHANNEL_51H5) {
			console.info("using channel huhuh5");
			return new Channel51H5(true);
		} else {
			console.info("using default channel");
            return new ChannelEgret(true);
		}
	}
	
    private _deferred: Q.Deferred<any>;
    private _standalone: boolean;
	
	constructor(standalone:boolean) {
		this._deferred = null;
        this._standalone = standalone;
    }
    
    public standalone():boolean {
        return this._standalone;
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