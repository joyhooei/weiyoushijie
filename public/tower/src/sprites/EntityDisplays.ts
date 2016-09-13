class EntityDisplays {
    private _displays: egret.DisplayObject[][];
    
    private _labels: string[][];

    private _currentDisplay: egret.DisplayObject;
    
    private _defaultDisplay: egret.DisplayObject;

    private _entityName: string;
    
    public constructor(entityName:string) {
        this._displays = [];
        
        this._labels = [];
        
        this._currentDisplay = null;
        this._defaultDisplay = null;

        this._entityName = entityName;
    }
    
    public addBitmap(name:string, action?:string): EntityDisplays {
        let bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes(name + "_png");
        
        if (action) {
            let idx = this._actionToIndex(action);
            this._displays[idx] = [bm];
        } else {
            this._defaultDisplay = bm;
        }
        
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
            let idx = this._actionToIndex(action);
            if (this._displays[idx]) {
                this._displays[idx].push(clip);
            } else {
                this._displays[idx] = [clip];
            }
        } else if (mcd.labels) {
            for(let i = 0; i < mcd.labels.length; i++) {
                action = mcd.labels[i].name;
                
                let idx = this._actionToIndex(action);
                if (this._displays[idx]) {
                    this._displays[idx].push(clip);
                    this._labels[idx].push(action);
                } else {
                    this._displays[idx] = [clip];
                    this._labels[idx] = [action];
                }
            }
        } else {
            this._defaultDisplay = clip;
        }
        
        return this;
    }
    
    public render(container: egret.DisplayObjectContainer, direction:EntityDirection, state: EntityState, index = 0): egret.DisplayObject  {
        if (this._currentDisplay) {
            container.removeChild(this._currentDisplay);
        }
        
        let display:egret.DisplayObject = this._getDisplay(direction, state, index);
        if (display) {
            container.addChild(display);
        } else {
            console.error("display dosn't exist for " + this._entityName + " direction = " + Entity.directionName(direction) + " state = " + Entity.stateName(state));
        }
    
        this._currentDisplay = display;

        return display;
    }
    
    private _getDefaultDisplay(): egret.DisplayObject {
        if (egret.getQualifiedClassName(this._defaultDisplay) == "egret.MovieClip") {
            let clip:egret.MovieClip = <egret.MovieClip>this._defaultDisplay;
            clip.frameRate = 12;
            clip.gotoAndPlay(0, -1);
        }
        
        return this._defaultDisplay;
    }

    private _getDisplay(direction:EntityDirection, state: EntityState, index = 0): egret.DisplayObject {
        let scaleX:number = 1;
        let scaleY:number = 1;
        
        let idx:number = (direction << 3) + state;
        if (!this._displays[idx]) {
            //是否有镜像的资源
            idx = (((direction + 4) % 8) << 3) + state;
            if (!this._displays[idx]) {
                //是否有方向相近的资源
                idx = (((direction + 1) % 8) << 3) + state;
                if (!this._displays[idx]) {
                    idx = (((direction + 7) % 8) << 3) + state;
                    if (!this._displays[idx]) {
                        idx = state;
                        if (!this._displays[idx]) {
                            return this._getDefaultDisplay();
                        }
                    }
                }
            } else {
                if (direction == EntityDirection.east || direction == EntityDirection.west) {
                    scaleX = -1;
                } else if (direction == EntityDirection.north || direction == EntityDirection.south) {
                    scaleY = -1;
                } else {
                    scaleX = -1;
                    scaleY = -1;
                }
            }
        }
        
        if (!this._displays[idx][index]) {
            index = 0;
        }
        
        let display:egret.DisplayObject  = this._displays[idx][index];
        
        if (egret.getQualifiedClassName(display) == "egret.MovieClip") {
            let clip:egret.MovieClip = <egret.MovieClip>display;
            clip.frameRate = 12;
            if (this._labels[idx] && this._labels[idx][index] && this._labels[idx][index].length > 0) {
                clip.gotoAndPlay(this._labels[idx][index], -1);
            } else {
                clip.gotoAndPlay(0, -1);
            }
        }
        
        display.scaleX = scaleX;
        display.scaleY = scaleY;
        if (scaleX == -1) {
            display.x = - display.width;
        } else {
            display.x = 0;
        }
        if (scaleY == -1) {
            display.y = - display.height;
        } else {
            display.y = 0;
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
