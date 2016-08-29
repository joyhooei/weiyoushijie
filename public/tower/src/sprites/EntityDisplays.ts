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
            let idx = this._actionToIndex(action);
            this._displays[idx] = display;
        } else {
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
        } else if (mcd.labels) {
            for(let i = 0; i < mcd.labels.length; i++) {
                this._add(clip, mcd.labels[i].name);
            }
        } else {
            this._add(clip);
        }
        
        return this;
    }
    
    private _play(clip:egret.MovieClip, direction:number, state: number) {
        let states = ["idle", "building", "moving", "guarding", "fighting", "dying", "dead"];
        let directions = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];

        let labels = clip.movieClipData.labels;
        if (labels) {
            for(let i = 0; i < labels.length; i++) {
                let label = labels[i].name;
                if ((label == (directions[direction] + "-" + states[state])) || (label == states[state])) {
                    clip.gotoAndPlay(label, -1);
                    return;
                }
            }            
        }
        
        clip.play(-1);
        return;
    }

    public render(container: egret.DisplayObjectContainer, direction:EntityDirection, state: EntityState): egret.DisplayObject  {
        let display:egret.DisplayObject = this._getDisplay(direction, state);
        if (display) {
            if (this._currentDisplay) {
                container.removeChild(this._currentDisplay);
            }
            
            if (display) {
                display.width  = container.width;
                display.height = container.height;
                container.addChild(display);
            }
        
            this._currentDisplay = display;
        }

        return display;
    }
    
    private _getDisplay(direction:number, state: number): egret.DisplayObject {
        let display:egret.DisplayObject  = null;
        
        let idx:number = (direction << 3) + state;
        if (this._displays[idx]) {
            display = this._displays[idx];

            if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
                this._play(<egret.MovieClip>display, direction, state);
            }
        } else if (direction == 0) {
            display = this._defaultDisplay;
            
            if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
                (<egret.MovieClip>display).play(-1);
            }
        } else {
            display = this._getDisplay(0, state);
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
}
