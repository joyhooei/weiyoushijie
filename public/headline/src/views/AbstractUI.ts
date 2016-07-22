class AbstractUI extends eui.Component{
    constructor(skinName:string) {
        super();

        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        
        this.skinName = skinName;
    }

    private uiCompHandler():void {
        this.onRefresh();
    }
    
    protected refresh(): void {
        this.onRefresh();
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
