class TiledMap extends egret.Sprite {
    private _grid: number[][];

    private _tileWidth: number;
    private _tileHeight: number;

    private _width: number;
    private _height: number;
    
    private _bases: number[][];
    private _heros: number[][];
    private _paths: number[][][];
    
    //入口和出口
    private _entrances: number[][];
    private _exits: number[][];

    public constructor(map:tiled.TMXTilemap) {
        super();
        
        this._parse(map);
        
        this.addChild(map);
    }
    
    public static load(url: string, width:number, height:number) : Q.Promise<any> {
        let self = this;

        return Q.Promise<any>(function(resolve,reject,notify) {
            var urlLoader:egret.URLLoader = new egret.URLLoader();
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
                var data:any = egret.XML.parse(event.target.data);
                
                let tmxTileMap:tiled.TMXTilemap = new tiled.TMXTilemap(width, height, data, url);
                tmxTileMap.render();
                resolve(new TiledMap(tmxTileMap));
            }, url);
            
            urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event:egret.Event):void {
                reject('加载地图失败');
            }, this);
            
            urlLoader.load(new egret.URLRequest(url));
        });
    }
    
    private _xP2L(x:number) {
        return Math.round(x / this._tileWidth);
    }
    
    private _yP2L(y:number) {
        return Math.round(y / this._tileHeight)
    }
    
    private _markGrid() {
        this._grid = [];
        for(let i = 0; i <= this._width; i++) {
            this._grid[i] = [];
            for(let j = 0; j <= this._height; j++) {
                this._grid[i][j] = 0;
            }
        }
        
        for(let j = 0; j < this._paths.length; j++) {
            let path = this._paths[j];
            for(let i = 0; i < path.length - 1; i++) {
                let xFrom = this._xP2L(path[i][0]);
                let yFrom = this._yP2L(path[i][1]);
                
                let xTo = this._xP2L(path[i + 1][0]);
                let yTo = this._yP2L(path[i + 1][1]);
                
                for(let k = xFrom; k <= xTo; k++) {
                    for(let j = yFrom; j <= yTo; j++) {
                        this._markArea(k, j, 1, 1);
                    }
                }
            }
        }
    }
    
    private _markArea(x:number, y:number, delta:number, value:number) {
        for(let i = x - delta; i <= x + delta; i++) {
            for(let j = y - delta; j <= y + delta; j++) {
                if (!this._outOfBounds(i, j)) {
                    this._grid[i][j] = value;
                }
            }
        }
    } 
    
    private _parse(tmxTileMap:tiled.TMXTilemap) {
        this._tileWidth  = tmxTileMap.tilewidth;
        this._tileHeight = tmxTileMap.tileheight;
        
        this._width  = tmxTileMap.width;
        this._height = tmxTileMap.height;
        
        this._paths = [];
        this._bases = [];
        this._heros = [];
        this._entrances = [];
        this._exits = [];

        let ogs = tmxTileMap.getObjects();
        for(let i = 0; i < ogs.length; i++) {
            let og = ogs[i];
            let name = og.name;
            let arrayOfStrings = name.split("-");

            if (arrayOfStrings[0] == 'path') {
                this._paths.push(this._parsePath(og));
            } else if (arrayOfStrings[0] == 'base') {
                this._bases = this._parseBases(og);
            } else if (arrayOfStrings[0] == 'hero') {
                this._heros = this._parseHeros(og);
            }
        }
        
        this._markGrid();
    }
    
    private _parsePath(og:tiled.TMXObjectGroup):number[][]{
        let path = [];
        
        for(let i = 0; i < og.getObjectCount(); i++) {
            let o = og.getObjectByIndex(i);
            let name = o.name;
            let location = [o.x, o.y];
            
            let arrayOfStrings = name.split("-");
            if (arrayOfStrings[0] == 'start') {
                path[0] = location;
                if (!this._exists(this._entrances, location)) {
                    this._entrances.push(location);
                }
            } else if (arrayOfStrings[0] = 'end') {
                path[og.getObjectCount() - 1] = location;
                if (!this._exists(this._exits, location)) {
                    this._exits.push(location);
                }
            } else {
                if (arrayOfStrings.length == 2 && arrayOfStrings[0] == 'waypoint') {
                    let idx = + arrayOfStrings[1];
                    path[idx] = location;
                }
            }
        }
        
        return path;
    }
    
    private _exists(locations:number[][], location:number[]):boolean {
        for(let i = 0; i < locations.length; i++) {
            if (locations[i][0] == location[0] && locations[i][1] == location[1]) {
                return true;
            }
        }
        
        return false;
    }

    private _parseBases(og:tiled.TMXObjectGroup):number[][]{
        let bases = [];

        for(let i = 0; i < og.getObjectCount(); i++) {
            let o = og.getObjectByIndex(i);
            let name = o.name;
            let arrayOfStrings = name.split("-");
            
            if (arrayOfStrings.length == 2 && arrayOfStrings[0] == 'base' || arrayOfStrings[0] == 'guarder') {
                let idx = + arrayOfStrings[1];
                if (!bases[idx]) {
                    bases[idx] = [];
                }
                
                if (arrayOfStrings[0] == 'base') {
                    bases[idx][0] = o.x;
                    bases[idx][1] = o.y;
                } else {
                    bases[idx][2] = o.x;
                    bases[idx][3] = o.y;
                }
            }
        }
        
        return bases;
    }
    
    private _parseHeros(og:tiled.TMXObjectGroup):number[][]{
        let heros = [];
        
        for(let i = 0; i < og.getObjectCount(); i++) {
            let o = og.getObjectByIndex(i);
            let name = o.name;
            let arrayOfStrings = name.split("-");
            
            if (arrayOfStrings[0] == 'start') {
                heros[i] = [o.x, o.y];
            }
        }
        
        return heros;
    }
    
    public walkable(x: number, y: number): boolean {
        x = this._xP2L(x);
        y = this._yP2L(y);
        return (!this._outOfBounds(x, y) && (this._grid[x][y] == 1));
    }
    
    private _outOfBounds(x: number, y: number): boolean {
        return (x >= 0 && x <= this._width && y >= 0 && y <= this._height);
    }
    
    public getBases(): number[][] {
        return this._bases;
    }

    public getHeros(): number[][] {
        return this._heros;          
    }

    public getPaths(): number[][][] {
        return this._paths;
    }
    
    public getEntrances(): number[][] {
        return this._entrances;
    }
    
    public getExits(): number[][] {
        return this._exits;
    }
}
