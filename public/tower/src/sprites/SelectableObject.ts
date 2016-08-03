class SelectableObject extends Object {
    private _selected: boolean;
    
    public constructor() {
        super();
        
        this._selected = false;
        
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._touch, this);
	}
    
    private _touch(e:egret.TouchEvent) {
        if (this._selected) {
            this._select(true);
        } else {
            this._selected = true;
            this._select(false);
        }
    }
    
    protected _select(again:boolean) {
    }
    
    public deselect() {
        this._selected = false;
    }
}
