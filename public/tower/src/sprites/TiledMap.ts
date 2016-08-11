class TiledMap extends egret.Sprite {
    private _map: tiled.TMXTilemap;
    
    private _grid: number[][];

    private _tileWidth: number;
    private _tileHeight: number;

    private _width: number;
    private _height: number;
    
    private _bases: number[][];
    private _heros: number[][];
    private _paths: number[][][];

    public constructor(map:tiled.TMXTilemap) {
        super();
        
        this._map = map;

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
                resolve(tmxTileMap);
            }, url);
            
            urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event:egret.Event):void {
                reject('加载地图失败');
            }, this);
            
            urlLoader.load(new egret.URLRequest(url));
        });
    }
    
    private _parse(tmxTileMap:tiled.TMXTilemap) {
        this._tileWidth  = tmxTileMap.tilewidth;
        this._tileHeight = tmxTileMap.tileheight;
        
        this._width  = tmxTileMap.width;
        this._height = tmxTileMap.height;
        
        this._grid = [];
        for(let i = 0; i <= this._width; i++) {
            for(let j = 0; j < this._height; j++) {
                this._grid[i][j] = 0;
            }
        }

        let ogs = tmxTileMap.getObjects();
        for(let i = 0; i < ogs.length; i++) {
            let og = ogs[i];
            let name = og.name();
            if (name.startsWith('path')) {
                this._paths.push(_parsePath(og));
            } else if (name.startsWith('base')) {
                this._bases = _parseBases(og);
            } else if (name.startsWith('hero')) {
                this._heros = _parseHeros(og);
            }
        }
    }
    
    private _parsePath(og:tiled.TMXObjectGroup):number[][]{
        let path = [];
        
        for(let i = 0; i < og.getObjectCount(); i++) {
            let o = og.getObjectByIndex(i);
            let name = o.name();
            
            if (name == 'start') {
                path[0] = [o.x, o.y];
            } else if (name = 'end') {
                path[og.getObjectCount() - 1] = [o.x, o.y];
            } else {
                let arrayOfStrings = name.split("-");
                if (arrayOfStrings.length == 2 && arrayOfStrings[0] == 'waypoint') {
                    let idx = + arrayOfStrings[1];
                    path[idx] = [o.x, o.y];
                }
            }
        }
        
        for(let i = 0; i < path.length - 1; i++) {
            let xFrom = Math.round(path[i][0] / this._tileWidth);
            let yFrom = Math.round(path[i][1] / this._tileHeight);
            
            let xTo = Math.round(path[i + 1][0] / this._tileWidth);
            let yTo = Math.round(path[i + 1][1] / this._tileHeight);
            
            for(let k = xFrom; k <= xTo; k++) {
                for(let j = yFrom; j <= yTo; j++) {
                    this._markArea(k, j, 1, 1);
                }
            }
        }
        
        return path;
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
    
    private _parsBases(og:tiled.TMXObjectGroup):number[][]{
        let bases = [];

        for(let i = 0; i < og.getObjectCount(); i++) {
            let o = og.getObjectByIndex(i);
            let name = o.name();
            let arrayOfStrings = name.split("-");
            
            if (arrayOfStrings.length == 2) {
                let idx = + arrayOfStrings[1];
                if (arrayOfStrings[0] == 'base') {
                    if (!bases[idx]) {
                        bases[idx] = [];
                    }
                    bases[idx][0] = o.x;
                    bases[idx][1] = o.y;
                } else if (arrayOfStrings[0] = 'guarder') {
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
            let name = o.name();
            
            if (name.startsWith('start')) {
                heros[i] = [o.x, o.y];
            }
        }
        
        return heros;
    }
    
    public walkable(x: number, y: number): boolean {
        x = Math.round(x / this._tileWidth);
        y = Math.round(y / this._tileHeight);
        return (!this._outofBounds(x, y) && (this._grid[x][y] == 1));
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
        return this.paths;
    }
}
