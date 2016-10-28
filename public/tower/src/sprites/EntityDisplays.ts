class EntityDisplays {
    private _displays: egret.DisplayObject[][];

    private _defaultDisplay: egret.DisplayObject;

    private _suitablities: number[];

    public constructor() {
        this._displays = [];
        
        this._suitablities = [];

        this._defaultDisplay = null;
    }
    
    public addBitmap(name:string, action?): egret.Bitmap {
        let bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes(name);
        
        this._addAll(bm, action);
        
        return bm;
    }
    
    public addClip(name:string, action?): egret.MovieClip {
        let data    = RES.getRes(name + "_json");
        let texture = RES.getRes(name + "_png");
        let mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        
        let clip = new egret.MovieClip();
        let mcd: egret.MovieClipData = mcf.generateMovieClipData(name);
        clip.movieClipData = mcd;
        
        this._addAll(clip, action);
        
        return clip;
    }
        
    private _addAll(display:egret.DisplayObject, action?) {
        if (action) {
            if (egret.getQualifiedClassName(action) == "Array"){
                for (let i = 0; i < action.length; i++) {
                    this._addOne(display, this._actionToIndex(action[i]));
                }
           } else {
                this._addOne(display, this._actionToIndex(action));
            }
        } else {
            this._defaultDisplay = display;
        }
    }

    private _addOne(display:egret.DisplayObject, idx:number) {
        let suitablities = [];
        suitablities[EntityDirection.north]     = [5, 3, 1, 0, 0, 0, 1, 3];
        suitablities[EntityDirection.east]      = [1, 2, 5, 2, 1, -2, -4, -2];
        suitablities[EntityDirection.south]     = [0, 0, 1, 3, 5, 3, 1, 0];
        suitablities[EntityDirection.west]      = [1, -2, -4, -2, 1, 2, 5, 2];
 
        let direction = idx >> 3;
        let state    = idx % 8;
        for(let dir = EntityDirection.north; dir <= EntityDirection.northwest; dir++) {
            let i = (dir << 3) + state;
            
            if (!this._suitablities[i]) {
                this._suitablities[i] = 0;
            }
            
            let suit = suitablities[direction][dir];
            if (Math.abs(suit) > Math.abs(this._suitablities[i])) {
                this._displays[i] = [display];
                
                this._suitablities[i] = suit;
            } else if (Math.abs(suit) == Math.abs(this._suitablities[i])) {
                if (this._displays[i]) {
                    this._displays[i].push(display);
                } else {
                    this._displays[i] = [display];
                }
            
                this._suitablities[i] = suit;
            }
        }
    }

    public getDisplay(direction:EntityDirection, state: EntityState, index = 0): egret.DisplayObject {
        let idx = (direction << 3) + state;
        
        if (!this._displays[idx]) {
            //没有资源，则显示缺省资源
            return this._defaultDisplay;
        }
        
        if (!this._displays[idx][index]) {
            index = 0;
        }
        
        let display:egret.DisplayObject = this._displays[idx][index];
        if (this._suitablities[idx] < 0) {
            display.scaleX = -1;
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
