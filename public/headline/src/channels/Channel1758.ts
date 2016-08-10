declare var hlmy;

window['onShareTimeline'] = function(){
	console.error('onShareTimeline');
	
    application.channel.resolve("");
}

class Channel1758 extends ChannelEgret {
	private url:string;
	
	public constructor(standalone:boolean) {
        super(standalone);
        
        this.url = "http://wx.1758.com/static/common/js/hlmy1758.js";
	}
    
    public share(options: any): Q.Promise<any> {
    	var self = this;
    	
    	self.require(self.url).then(function(){
    		hlmy.setShareInfo({state: "", tipInfo: true, reward: ['100钻石']});
    	});
    	
    	return self.promise();
    }
}
