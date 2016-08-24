class EntityDisplays {
    private _displays: egret.DisplayObject[];
    private _keys: any[];
    
    private _currentDisplay: egret.DisplayObject;
    
    private _defaultDisplay: egret.DisplayObject;
    
    public constructor() {
        this._displays    = [];
        this._keys = [];
        
        this._currentDisplay = null;
        this._defaultDisplay = null;
    }
    
    public add(display:egret.DisplayObject, options:any) {
        this._displays.push(display);
        this._keys.push(options);
    }
    
    public addClip(dataRes:string, textureRes:string, clipName:string, options:any) {
        let data    = RES.getRes(dataRes);
        let texture = RES.getRes(textureRes);
        let mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        
        let display = new egret.MovieClip();
        display.movieClipData = mcf.generateMovieClipData(clipName);
        
        this.add(display, options);
    }
    
    public setDefault(display:egret.DisplayObject) {
        this._defaultDisplay = display;
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
        
        if (display) {
            return display;
        } else {
            return this._defaultDisplay;
        }
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
