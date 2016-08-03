class SelectableObject extends Object {
    static _selectedObj: SelectableObject;
    
    public constructor() {
        super();
        
        this._selected = false;
        
        this.touchEnabled = true;
        
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);
	}
    
    private _touch(e:egret.TouchEvent) {
    	if (SelectableObject._selectedObj == this) {
    		this._select(true);
    	} else {
    		SelectableObject._selectedObj._deselect();
    		
    		this._select(false);
    	}
    }
    
    protected _select(again:boolean) {
    }
    
    protected _deselect() {
    }
}
