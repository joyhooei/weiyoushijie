class EntityDisplays {
    private _displays: egret.DisplayObject[][];

    private _defaultDisplay: egret.DisplayObject;

    public constructor() {
        this._displays = [];

        this._defaultDisplay = null;
    }
    
    public addBitmap(name:string, action?): egret.Bitmap {
        let bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes(name);
        
        if (action) {
            if (egret.getQualifiedClassName(action) == "Array"){
                for (let i = 0; i < action.length; i++) {
                    let idx = this._actionToIndex(action[i]);
                    this._displays[idx] = [bm];
                }
            } else {
                let idx = this._actionToIndex(action);
                this._displays[idx] = [bm];                
            }
        } else {
            this._defaultDisplay = bm;
        }
        
        return bm;
    }
    
    public addClip(name:string, action?): egret.MovieClip {
        let data    = RES.getRes(name + "_json");
        let texture = RES.getRes(name + "_png");
        let mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        
        let clip = new egret.MovieClip();
        let mcd: egret.MovieClipData = mcf.generateMovieClipData(name);
        clip.movieClipData = mcd;
        
        if (action) {
            if (egret.getQualifiedClassName(action) == "Array"){
                for (let i = 0; i < action.length; i++) {
                    let idx = this._actionToIndex(action[i]);
                    if (this._displays[idx]) {
                        this._displays[idx].push(clip);
                    } else {
                        this._displays[idx] = [clip];
                    }
                }
           } else {
                let idx = this._actionToIndex(action);
                if (this._displays[idx]) {
                    this._displays[idx].push(clip);
                } else {
                    this._displays[idx] = [clip];
                }
            }
        } else {
            this._defaultDisplay = clip;
        }
        
        return clip;
    }

    public getDisplay(direction:EntityDirection, state: EntityState, index = 0): egret.DisplayObject {
        let directions = [];
        directions[EntityDirection.north]     = [EntityDirection.north, EntityDirection.east, EntityDirection.west];
        directions[EntityDirection.northeast] = [EntityDirection.north, EntityDirection.east, EntityDirection.west];
        directions[EntityDirection.east]      = [EntityDirection.east, EntityDirection.west, EntityDirection.north, EntityDirection.south];
        directions[EntityDirection.southeast] = [EntityDirection.south, EntityDirection.east, EntityDirection.west];
        directions[EntityDirection.south]     = [EntityDirection.south, EntityDirection.east, EntityDirection.west];
        directions[EntityDirection.southwest] = [EntityDirection.south, EntityDirection.west, EntityDirection.east];
        directions[EntityDirection.west]      = [EntityDirection.west, EntityDirection.east, EntityDirection.north, EntityDirection.south];
        directions[EntityDirection.northwest] = [EntityDirection.north, EntityDirection.west, EntityDirection.east];
        
        let idx:number = 0;
        let scaleX:number = 1;

        for(let i = 0; i < directions[direction].length; i++) {
            let newDirection = directions[direction][i];
            
            idx = (newDirection << 3) + state;
            if (this._displays[idx]) {
                if ((newDirection == EntityDirection.west && direction >= EntityDirection.northeast && direction <= EntityDirection.southeast) || 
                    (newDirection == EntityDirection.east && direction >= EntityDirection.southwest && direction <= EntityDirection.northwest))
                    scaleX = -1;
                }

                break;
            }
        }
        if (!this._displays[idx]) {
            //没有资源，则显示缺省资源
            return this._defaultDisplay;
        }
        
        if (!this._displays[idx][index]) {
            index = 0;
        }
        
        let display:egret.DisplayObject  = this._displays[idx][index];
        display.scaleX = scaleX;
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
