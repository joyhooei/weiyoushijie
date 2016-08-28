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
            this._displays[this._actionToIndex(action)] = display;
        }
        
        if (!this._defaultDisplay) {
            this._defaultDisplay = display;
        }
    }
    
    public addBitmap(name:string, action?:string): EntityDisplays {
        let bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes(name + "_png");
        
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
            if (mcd.labels) {
                for(let i = 0; i < mcd.labels.length; i++) {
                    let label = mcd.labels[i];
                    this._add(clip, label.name);
                }
            }
        }
        
        return this;
    }

    public render(container: egret.DisplayObjectContainer, direction:EntityDirection, state: EntityState): boolean {
        let display = this._getDisplay(direction, state);
        if (display) {
            if (this._currentDisplay) {
                container.removeChild(this._currentDisplay);
            }
            
            if (display) {
                container.addChild(display);
            }
        
            this._currentDisplay = display;

            return true;
        } else {
            return false;
        }
    }
    
    /*
    */
    private _getDisplay(direction:number, state: number): egret.DisplayObject {
        let display  = null;
        
        let idx = (direction << 3) + state;
        if (this._displays[idx]) {
            display = this._displays[idx];

            if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
                let label = this._indexToAction(idx);
                (<egret.MovieClip>display).gotoAndPlay(label, -1);
            }
        } else {
            if (direction == 0) {
                display = this._defaultDisplay;
                
                if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
                    (<egret.MovieClip>display).play(-1);
                }                
            } else {
                display = this._getDisplay(0, state);
            }
        }
        
        return display;
    }
    
    private _actionToIndex(action: string): number {
        let table = {
            idle : 0,
            building : 1,
            moving: 2,
            guarding: 3,
            fighting: 4,
            dying: 5,
            dead: 6,
        
            north: 0,
            northeast: 1,
            east: 2,
            southeast: 3,
            south: 4,
            southwest: 5,
            west: 6,
            northwest: 7            
        }
        
        let idx = 0;
        
        let actions = action.split("-");
        for (let i = 0; i < actions.length; i++) {
            idx = (idx << 3) + table[actions[i]];
        }
        
        return idx;
    }
    
    private _indexToAction(idx:number): string {
        let directions = ["idle", "building", "moving", "guarding", "fighting", "dying", "dead"];
        let states = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];

        if (idx >= 8) {
            return directions[idx >> 3] + "-" + states[idx % 8];
        } else {
            return states[idx % 8];
        }
    }
}
