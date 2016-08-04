declare var hlmy;

window['onShareTimeline'] = function(){
	console.log('onShareTimeline');
	
    application.channel.resolve();
}

class Channel1758 extends ChannelEgret {
	public constructor(standalone:boolean) {
        super(standalone);
        
        this.loadjs("http://wx.1758.com/static/common/js/hlmy1758.js");
	}
    
    public share(options: any): Q.Promise<any> {
    	var self = this;
    	
    	hlmy.setShareInfo();
    	
    	return self.promise();
    }
}
