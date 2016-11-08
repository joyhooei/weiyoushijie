class OptionUI extends AbstractUI{
    public imgBack:eui.Button;
	
    public imgOk:eui.Image;
	public imgCancel:eui.Image;
    
    public imgIcon:eui.Image;
    public lblContent:eui.Label;
    
    private _iconPath: string;
    private _content: string;
    private _cbOk: Function;
    private _cbCancel: Function;

    constructor(iconPath:string, content:string, cbOk:Function, cbCancel?:Function) {
        super("towerOptionUISkin");
        
        this._iconPath = iconPath;
        this._content  = content;
        this._cbOk = cbOk;
        this._cbCancel = cbCancel;

        this.imgBack.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
           this.hide();
        }, this);
        
        this.imgOk.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            if (this._cbOk) {
                this._cbOk();
            }
            
	        this.hide();
        }, this);
        
        this.imgCancel.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            if (this._cbCancel) {
                this._cbCancel();
            }
            
	        this.hide();
        }, this);
    }
	
    protected onRefresh(): void {
        this.imgIcon.source = this._iconPath;
        this.lblContent.text = this._content;
	}
}
