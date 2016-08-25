class EntityDisplays {
    private _displays: egret.DisplayObject[];

    private _currentDisplay: egret.DisplayObject;
    
    private _defaultDisplay: egret.DisplayObject;
    
    public constructor() {
        this._displays = [];
        
        this._currentDisplay = null;
        this._defaultDisplay = null;
    }
    
    private _add(display:egret.DisplayObject, action?:string) {
        if (action) {
            this._displays[action] = display;
        } else {
            this._defaultDisplay = display;
        }
    }
    
    public addBitmap(name:string, action?:string): EntityDisplays {
        let bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes(name);
        
        this._add(bm, action);
        
        return this;
    }
    
    public addClip(name:string, action?:string): EntityDisplays {
        let data    = RES.getRes(name + "_json");
        let texture = RES.getRes(name + "_png");
        let mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        
        let clip = new egret.MovieClip();
        let mcd: egret.MovieClipData = mcf.generateMovieClipData(name);
        clip.movieClipData = mcd;
        
        if (action) {
            this._add(clip, action);
        } else {
            for(let i = 0; i < mcd.labels.length; i++) {
                let label = mcd.labels[i];
                this._add(clip, label);
            }
        }
        
        return this;
    }

    public render(container: egret.DisplayObjectContainer, action:string): boolean {
        let display = this._getDisplay(action);
        if (display) {
            if (display != this._currentDisplay) {
                if (this._currentDisplay) {
                    container.removeChild(this._currentDisplay);
                }
                
                if (display) {
                    container.addChild(display);
                }
            
                this._currentDisplay = display;
            }

            return true;
        } else {
            return false;
        }
    }
    
    /*
    east_moving
    moving
    */
    private _getDisplay(action:string): egret.DisplayObject {
        let display  = null;
        
        for (let key in this._displays) {
            if (key == action) {
                display = this._displays[key];

                if (egret.getQualifiedClassName(display) == "MovieClip") {
                    (<egret.MovieClip>display).gotoAndPlay(action);
                }
                
                break;
            }
        }
    
        if (display == null) {
            let actions = action.split("_");
            if (actions.length <= 1) {
                if (this._defaultDisplay) {
                    display = this._defaultDisplay;
                } else if (this._displays.length > 0) {
                    display = this._displays[0];
                }
                
                if (egret.getQualifiedClassName(display) == "MovieClip") {
                    (<egret.MovieClip>display).play();
                }                
            } else {
                actions.splice(0, 1);
                let action = actions.join("_");
                display = this._getDisplay(action);
            }
        }
        
        return display;    
    }
}
