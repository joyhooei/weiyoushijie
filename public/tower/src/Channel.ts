const CHANNEL_1758_IN_EGRET = "10016";
const CHANNEL_HUHUH5 = "huhuh5";
const CHANNEL_51H5 = "51h5";

const TRACK_CATEGORY_PLAYER   = "player";
const TRACK_CATEGORY_DIAMOND  = "diamond";
const TRACK_CATEGORY_GOLD     = "gold";
const TRACK_CATEGORY_ACTIVITY = "activity";
const TRACK_CATEGORY_GUIDE    = "guide";
const TRACK_CATEGORY_RESOURCE = "resource";

const TRACK_ACTION_DEC    = "dec";
const TRACK_ACTION_INC    = "inc";
const TRACK_ACTION_JOIN   = "join";
const TRACK_ACTION_ENTER  = "enter";
const TRACK_ACTION_LEAVE  = "leave";
const TRACK_ACTION_LOAD   = "load";

declare var loadfile;

class Channel {
	static create(): Channel {
        let cid = egret.getOption("wysj_channel") || egret.getOption("channelId") || egret.getOption("egret.runtime.spid") ||  "egret";
		
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
	
	private _timer:egret.Timer;
    private _deferred: Q.Deferred<any>;
    private _standalone: boolean;
    
    private _loadingUI: LoadingUI;
	
	constructor(standalone:boolean) {
		this._deferred = null;
        this._standalone = standalone;
    }
    
    public standalone():boolean {
        return this._standalone;
    }
    
    public require(file:string):Q.Promise<any> {    	
        return Utility.require(file);
    }

	public rest(channel:string, method:string, data:any): Q.Promise<any> {
        var url = application.baseUrl + "channels/" + method + "?wysj_channel=" + channel + "&game=" + application.game;
        
        console.log("rest " + url + " " + JSON.stringify(data));
        
        return application.dao.restWithUrl(url, data);
	}
    
    public promise(): Q.Promise<any>  {
        this._timer = new egret.Timer(60 * 1000, 1);
        this._timer.addEventListener(egret.TimerEvent.TIMER,function(event: egret.TimerEvent) {
			this.reject("操作超时");
		}, this);
		this._timer.start();

        return this._promiseWithoutTimeout();
    }
    
    private _promiseWithoutTimeout(): Q.Promise<any>  {
    	this.reject("");

        this._deferred = Q.defer<any>();
        return this._deferred.promise;    	
    }
	
	public resolvedPromise(): Q.Promise<any> {
        var promise = this._promiseWithoutTimeout();
		this._deferred.resolve();
        return promise;  		
	}
	
	public rejectedPromise(): Q.Promise<any> {
        var promise = this._promiseWithoutTimeout();
		this._deferred.reject("目前不支持");
        return promise;
	}
    
    public resolve(data?:any) {
        if (this._deferred) {
        	this._deferred.resolve(data);
        }
        
        if (this._timer) {
        	this._timer.stop();
        }
        
        this._deferred = null;
    }

    public reject(data?: any) {
        if(this._deferred) {
            this._deferred.reject(data);
        }
        
        if (this._timer) {
        	this._timer.stop();
        }
        
        this._deferred = null;
    }
    
    public openScreen(stage:egret.Stage): void {
    	this._loadingUI = new LoadingUI();
        stage.addChild(this._loadingUI);
    }
    
    public setOpenScreenProgress(progress:number, total:number, title:string): void {
    	this._loadingUI.setProgress(progress, total);
    	
    	if (progress == total) {
    		if( this._loadingUI.parent ){
                this._loadingUI.parent.removeChild( this._loadingUI );
            }
    	}
    }
    
    public loginQuietly(): Q.Promise<any> {
    	var self = this;
    	
    	return self.rejectedPromise();
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
    
    public track(category:string, action?:string, opt_label?:string, opt_value?:number) {
		switch(category) {
			case TRACK_CATEGORY_PLAYER:
				if (action == TRACK_ACTION_ENTER){
				} else {
				}
				return;
				
			case TRACK_CATEGORY_DIAMOND:
				if (action == TRACK_ACTION_INC){
				} else {
				}
				return;
				
			case TRACK_CATEGORY_GOLD:
				if (action == TRACK_ACTION_INC){
				} else {
				}
				return;
				
			case TRACK_CATEGORY_ACTIVITY:
				return;
				
			case TRACK_CATEGORY_GUIDE:
				return;
				
			case TRACK_CATEGORY_RESOURCE:
				return;
		}
    }	
}
