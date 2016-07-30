declare var hlmy;

class Channel1758 extends ChannelEgret {
	public constructor(standalone:boolean) {
        super(standalone);
        
        this.loadjs("http://wx.1758.com/static/common/js/hlmy1758.js");
	}
    
    public share(options: any): Q.Promise<any> {
        let self = this;

        hlmy.setShareInfo();
        
        window['onShareTimeline'] = function(){
            self.resolve();
        }
        
        return self.promise();
    }
}
