class AbstractUI extends eui.Component{
    constructor(skinName:string) {
        super();

        var self = this;
        
        self.addEventListener( eui.UIEvent.COMPLETE, self._uiCompHandler, self );
        
        Utility.delay(function(){
            self.skinName = "resource/custom_skins/" + skinName + ".exml";    
        }, 10);
    }

    private _uiCompHandler() {
        try {
            this.onRefresh();
        } catch(error) {
            console.error('_uiCompHandler onRefresh failed ' + error.message);
        }
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
