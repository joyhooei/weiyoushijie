class EntityDisplays {
    private _displays: egret.DisplayObject[];
    private _keys: any[];
    
    private _currentDisplay: egret.DisplayObject;
    
    public constructor() {
        this._skins    = [];
        this._displays = [];
        
        this._currentDisplay = null;
    }
    
    public addDisplay(display:egret.DisplayObject, options:any) {
        this._displays.append(display);
        this._keys.append(options);
    }

    public render(container: egret.DisplayObjectContainer, options:any): boolean {
        let display = this._getDisplay(options);
        if (display && display != this._currentDisplay) {
            if (this._currentDisplay) {
                container.removeChild(this._currentDisplay);
            }
            
            container.addChild(display);
            
            if (egret.getQualifiedClassName(display) == "MovieClip") {
                (<egret.MovieClip>display).play();
            }
            
            this._currentDisplay = display;
            
            return true;
        } else {
            return false;
        }
    }
    
    private _getDisplay(options:any): egret.DisplayObject {
        let display  = null;
        let suitable = 0;
        
        for(let i = 0; i < this._keys.length; i++) {
            let s = this._suitable(options, this._keys[i]);
            if (s > suitable) {
                display  = this._displays[i];
                suitable = s;
            }
        }
        
        return display;
    }
    
    private _suitable(options:any, keys:any): number {
        let suitable:number = 0;
        
        for (var key in options) {
            if (keys.hasOwnProperty(key)) {
                if (keys[key] == options[key]) {
                    if (key == "direction") {
                        suitable += 2;
                    } else {
                        suitable += 1;
                    }
                } else {
                    return 0;
                }
            }
        }
        
        return suitable;
    }
}
