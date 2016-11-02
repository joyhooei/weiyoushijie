class EntityDisplays {
    private _displays: egret.DisplayObject[][];

    private _default: egret.DisplayObject;

    private _suitablities: number[];

    //6：完全匹配
    //5：镜像完全匹配
    //4：45度匹配
    //3：镜像45度匹配
    //2：90度匹配
    //1：镜像90度匹配（不存在）
    //0：不匹配
    static suitablities = [
            //north
            [6, 4, 2, 0, 0, 0, 2, 4],
            //east
            [2, 4, 6, 4, 2, 3, 5, 3],
            //south
            [0, 0, 2, 4, 6, 4, 2, 0],
            //west
            [2, 3, 5, 3, 2, 4, 6, 4]
        ];

    public constructor() {
        this._displays = [];
        this._suitablities = [];
        this._default  = null;
    }
    
    public addBitmap(name:string, action?): egret.Bitmap {
        let bm = EntityDisplays.loadBitmap(name);
        this._addAll(bm, action);
        return bm;
    }
    
    public addClip(name:string, action?): egret.MovieClip {
        let clip = EntityDisplays.loadClip(name);
        this._addAll(clip, action);
        return clip;
    }

    static loadBitmap(name: string): egret.Bitmap {
        let bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes(name);
        
        return bm;
    }

    static loadClip(name: string): egret.MovieClip {
        let data    = RES.getRes(name + "_json");
        let texture = RES.getRes(name + "_png");
        let mcf: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
        
        let clip = new egret.MovieClip();
        let mcd: egret.MovieClipData = mcf.generateMovieClipData(name);
        clip.movieClipData = mcd;
        
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
            this._default = display;
        }
    }

    private _addOne(display:egret.DisplayObject, idx:number) {
        let direction = idx >> 3;
        let state     = idx % 8;
        for(let dir = EntityDirection.north; dir <= EntityDirection.northwest; dir++) {
            let i = (dir << 3) + state;
            
            let oldSuit = this._suitablities[i] || 0;
            let newSuit = EntityDisplays.suitablities[direction >> 1][dir];
            if (newSuit > oldSuit) {
                this._displays[i] = [display];
                
                this._suitablities[i] = newSuit;
            } else if (newSuit == oldSuit) {
                if (this._displays[i]) {
                    this._displays[i].push(display);
                } else {
                    this._displays[i] = [display];
                }
            
                this._suitablities[i] = newSuit;
            }
        }
    }

    public has(state: EntityState): boolean {
        for(let i = EntityDirection.north; i <= EntityDirection.northwest; i++) {
            let idx = (i << 3) + state;
            if (this._displays[idx]) {
                return true;
            }
        }

        return false;
    }

    public getDisplay(direction:EntityDirection, state: EntityState, index = 0): egret.DisplayObject {
        let idx = (direction << 3) + state;
        
        if (!this._displays[idx]) {
            //没有资源，则显示缺省资源
            return this._default;
        }
        
        if (!this._displays[idx][index]) {
            index = 0;
        }
        
        let display:egret.DisplayObject = this._displays[idx][index];
        if (this._suitablities[idx] % 2 == 1) {
            display.scaleX = -1;
        } else {
            display.scaleX = 1;
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
