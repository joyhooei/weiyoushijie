class AbstractUI extends eui.Component{
    constructor(skinName:string) {
        super();

        this.addEventListener(eui.UIEvent.COMPLETE,this._uiCompHandler,this );
        
        this.skinName = "resource/custom_skins/" + skinName + ".exml";    
    }

    private _uiCompHandler() {
        var self = this;

        Utility.delay(function(){
            try {
                self.onRefresh();
            } catch(error) {
                console.error('_uiCompHandler onRefresh failed ' + error.message);
            }
        }, 10);
    }
    
    public refresh() {
        try {
            this.onRefreshAgain();
        } catch(error) {
            console.error('refresh onRefresh failed ' + error.message);
        }
    }
    
    protected onRefresh() {
    }
    
    protected onRefreshAgain() {
        this.onRefresh();
    }
    
    public show(child: eui.Component, hide?: boolean) {
        if (hide) {
            this.hide();
            
            application.showUI(child);
        } else {
            application.showUI(child, this);
        }
    }
    
    public hide() {
        application.hideUI(this);
    }
}
