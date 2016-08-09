//https://github.com/bgrins/javascript-astar
declare Graph;
declare astar;

enum TileType {
    wall = 0,
    path,
    base,
    solider,
    hero,
    entrance,
    exit
}

class TiledMap extends Entity {
    private _map: tiled.TMXTilemap;
    
    private _grid: number[][];

    private _tileWidth: number;
    private _tileHeight: number;
    
    private _entranceTileId: number,
    private _exitTileId: number,
    private _pathTileId: number,
    private _baseTileId: number,
    private _soliderTileId: number,
    private _heroTileId: number,
    
    public constructor(entrance:number, exit:number, path:number, base:number, solider:number, hero:number) {
        super();
        
        this._entranceTileId = entrance;
        this._exitTileId = exit;
        this._pathTileId = path;
        this._baseTileId = base;
        this._soliderTileId = solider;
        this._heroTileId = hero;
    }
    
    public load(url: string, width:number, height:number) : Q.Promise<any> {
        let self = this;

        return Q.Promise<any>(function(resolve,reject,notify) {
            var urlLoader:egret.URLLoader = new egret.URLLoader();
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
                var data:any = egret.XML.parse(event.target.data);
                
                self.tmxTileMap = new tiled.TMXTilemap(width, height, data, url);
                self.tmxTileMap.render();
                self._parseTMXTilemap(self.txtTileMap);
                self.addChild(self.txtTileMap);
                resolve(self);
            }, url);
            
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event:egret.Event):void {
                reject('加载地图失败');
            }, this);
            
            urlLoader.load(new egret.URLRequest(url));
        });
    }
    
    private _parseTMXTilemap(tmxTileMap:tiled.TMXTilemap) {
        this._grid = [];
                
        this._tileWidth  = tmxTileMap.tilewidth();
        this._tileHeight = tmxTileMap.tileheight();
        
        let layers: Array<any> = this.getLayers();
        
        let pathLayer:tiled.TMXLayer = <tiled.TMXLayer>layers[1];
        for(let i = 0; i < pathLayer.rows(); i++) {
            for(let j = 0; j < pathLayer.cols(); j++) {
                let tileId = pathLayer.getTileId(i, j);
                if (tileId == this._entranceTileId) {
                    this._grid[i][j] = TileType.entrance;
                } else if (tileId == this._exitTileId) {
                    this._grid[i][j] = TileType.exit;
                } else if (tileId == this._pathId) {
                    this._grid[i][j] = TileType.path;
                } else {
                    this._grid[i][j] = TileType.wall;
                }
            }
        }
        
        let baseLayer:tiled.TMXLayer = <tiled.TMXLayer>layers[2];
        for(let i = 0; i < baseLayer.rows(); i++) {
            for(let j = 0; j < baseLayer.cols(); j++) {
                let tileId = baseLayer.getTileId(i, j);
                if (tileId == this._baseTileId) {
                    this._grid[i][j] = TileType.base;
                } else if (tileId == this._soliderTileId) {
                    this._grid[i][j] = TileType.solider;
                } else if (tileId == this._heroTileID) {
                    this._grid[i][j] = TileType.hero;
                }
            }
        }
        
        return tmxTileMap;
    }
    
    public movable(x: number, y: number): boolean {
        x = Math.round(x / this._tileWidth);
        y = Math.round(y / this._tileHeight);
        return (x < this._grid.length && y < this._grid[x].length 
                && (this._grid[x][y] == TileType.path || this._grid[x][y] == TileType.solider || this._grid[x][y] == TileType.hero)
            );
    }
    
    public getBasePositions(): number[][] {
        return this._getPositionsByType(TileType.base);    
    }
    
    public getBaseGuardPosition(x: number, y: number): number[] {
        return this._getPositionsByType(TileType.solider);            
    }
    
    public getHeroGuardPositions(): number[][] {
        return this._getPositionsByType(TileType.hero);          
    }
    
    public getEnemyEntrances(): number[][] {
        return this._getPositionsByType(TileType.entrance);   
    }
    
    public getEnemyExits(): number[][] {
        return this._getPositionsByType(TileType.exit);         
    }
    
    public getEnemyPaths(): number[][][] {
        let paths = number[][][];
        
        let entrances = this.getEnemyEntrances();
        let exits = this.getEnemyExits();
        
        for(let i = 0; i < entrances.length; i++) {
            for(let j = 0; j < exits.length: j++) {
                let path = this._getEnemyPath(entrances[i], exits[j]);
                if (path && path.length > 0) {
                    paths.push([path[0] * this._tileWidth, path[1] * this._tileHeight]);
                }
            }
        }
        
        return paths;
    }
    
    private _getEnemyPath(entrance:number[], exit: number[]): number[][] {
        var graph = new Graph(this._grid, { diagonal: true });
        var start = graph.grid[entrance[0]][entrance[1]];
        var end   = graph.grid[exit[0]][exit[1]];
        
        return astar.search(graph, start, end, { heuristic: astar.heuristics.diagonal });
    }
    
    private _getPositionsByType(type:number) : number[][] {
        let positions = [][];
        
        for(let i = 0; i < this._grid.length; i++) {
            for(let j = 0; j < this._grid[i].length; j++) {
                if (this._grid[i][j] == type) {
                    positions.push([i * this._tileWidth, j * this._tileHeight]);
                }
            }
        }
        
        return positions;           
    }
}
