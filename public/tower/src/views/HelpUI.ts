class HelpUI extends eui.Component{
    private imgBack:eui.Image;
    private imgReport:eui.Image;
    
    private lblContent:eui.Label;
    private lblVersion: eui.Label;
    
    constructor(content:string) {
        super();
        
        this.skinName = "resource/custom_skins/helpUISkin.exml";
        
        this.lblContent.text = content;
        
        this.lblVersion.text = application.version;
        
        this.imgReport.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);
            
            application.showUI(new ReportUI());
        }, this ); 
        
        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            application.hideUI(this);
        }, this );        
    }

    public static showMainHelp() {
        let content = "玩法\n"
        content += "1. 点击中间舞者可产生金币，金币用来升级运营项目，而运营项目随等级提高从而产生更多的金币。\n"
        content += "2. 金币可以用来参加头条拍卖，每天最高出价者会成为头条，获得头条殊荣，勋章和钻石奖励。\n"
        content += "3. 道具可以帮助玩家快速获得大量金币和永久提高运营项目的每秒产量。\n"
        content += "4. 排行榜会按照勋章的个数排名，勋章数量一致时则按照金币的总量排名。\n"
		
        application.showUI(new HelpUI(content));
    }        
}
