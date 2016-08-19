class EntityDisplays {
    private _displays: egret.DisplayObject[];
    private _keys: any[];
    
    private _currentDisplay: egret.DisplayObject;
    
    public constructor() {
        this._skins    = [];
        this._displays = [];
        
        this._currentDisplay = null;
    }
    
    public addDisplay(do:egret.DisplayObject, options:any) {
        this._displays.append(do);
        this._keys.append(options);
    }

    public render(entity: Entity, options:any): boolean {
        let do = this._getDisplay(options);
        if (do && do != this._currentDisplay) {
            if (this._currentDisplay) {
                entity.removeChild(this._currentDisplay);
            }
            
            entity.addChild(do);
            
            if (egret.getQualifiedClassName(do) == "MovieClip") {
                let clip:egret.MovieClip = <egret.MovieClip>do;
                clip.play();
            }
            
            this._currentDisplay = do;
            
            return true;
        } else {
            return false;
        }
    }
    
    private _getDisplay(options:any): egret.DisplayObject {
        for(let i = 0; i < this._keys.length; i++) {
            let o = this._keys[i];
            
            boolean found = true;
            for (var key in options) {
                if (!o.hasOwnProperty(key) || o[key] != options[key]) {
                    found = false;
                    break;
                }
            }
            
            if (found) {
                return this._displays[i];
            }
        }
        
        return null;
    }
}
