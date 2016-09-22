class EntityDisplays {
    private _displays: egret.DisplayObject[][];

    private _defaultDisplay: egret.DisplayObject;

    public constructor() {
        this._displays = [];

        this._defaultDisplay = null;
    }
    
    public addBitmap(name:string, action?:string): egret.Bitmap {
        let bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes(name + "_png");
        
        if (action) {
            let idx = this._actionToIndex(action);
            this._displays[idx] = [bm];
        } else {
            this._defaultDisplay = bm;
        }
        
        return bm;
    }
    
    public addClip(name:string, action?:string): egret.MovieClip {
        let data    = RES.getRes(name + "_json");
        let texture = RES.getRes(name + "_png");
        let mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        
        let clip = new egret.MovieClip();
        let mcd: egret.MovieClipData = mcf.generateMovieClipData(name);
        clip.movieClipData = mcd;
        
        if (action) {
            let idx = this._actionToIndex(action);
            if (this._displays[idx]) {
                this._displays[idx].push(clip);
            } else {
                this._displays[idx] = [clip];
            }
        } else {
            this._defaultDisplay = clip;
        }
        
        return clip;
    }

    public getDisplay(direction:EntityDirection, state: EntityState, index = 0): egret.DisplayObject {
        let scaleX:number = 1;
        let scaleY:number = 1;
        
        let rotation:number = 0;
        
        let idx:number = (direction << 3) + state;
        if (!this._displays[idx]) {
            //是否有镜像的资源
            idx = (((direction + 4) % 8) << 3) + state;
            if (!this._displays[idx]) {
                //是否有顺时针90度的资源
                idx = (((direction + 2) % 8) << 3) + state;
                if (!this._displays[idx]) {
                    //是否有顺时针90度的资源
                    idx = (((direction + 6) % 8) << 3) + state;
                    if (!this._displays[idx]) {
                        idx = state;
                        if (!this._displays[idx]) {
                            return this._defaultDisplay;
                        }
                    } else {
                        rotation = -90;
                    }
                } else {
                    rotation = 90;
                }
            } else {
                if (direction == EntityDirection.east || direction == EntityDirection.west) {
                    scaleX = -1;
                } else {
                    scaleY = -1;
                }
            }
        }
        
        if (!this._displays[idx][index]) {
            index = 0;
        }
        
        let display:egret.DisplayObject  = this._displays[idx][index];

        display.scaleX = scaleX;
        display.scaleY = scaleY;
        
        display.rotation = rotation;

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
