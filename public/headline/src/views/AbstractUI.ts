class AbstractUI extends eui.Component{
    constructor(skinName:string) {
        super();

        this.addEventListener( eui.UIEvent.COMPLETE, this._uiCompHandler, this );
        
        this.skinName = "resource/custom_skins/" + skinName + ".exml";;
    }

    private _uiCompHandler():void {
        try {
            this.onRefresh();
        } catch(error) {
            console.error('_uiCompHandler onRefresh failed ' + error.message);
        }
    }
    
    public refresh(): void {
        try {
            this.onRefresh();
        } catch(error) {
            console.error('refresh onRefresh failed ' + error.message);
        }
    }
    
    protected onRefresh(): void {
    }
    
    public show(parent:parent?: egret.DisplayObjectContainer): AbstractUI {
        application.showUI(this, parent);
        
        return this;
    }
    
    public hide(): void {
        application.hideUI(this);
    }
}
