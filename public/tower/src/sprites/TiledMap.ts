//https://github.com/bgrins/javascript-astar
declare Graph;
declare astar;

class TiledMap extends Entity {
    private _map: tiled.TMXTilemap;
    
    private _grid: number[][];

    private _spriteWidth: number;
    private _spriteHeight: number;
    
    private _entranceTileId: number,
    private _exitTileId: number,
    private _pathId: number,
    private _baseTileId: number,
    private _baseGuardTileId: number,
    private _heroGuardTileId: number,
    
    public constructor() {
        this._grid = [][];
    }
    
    public load(url: string, width:number, height:number) : Q.Promise<any> {
        let self = this;

        return Q.Promise<any>(function(resolve,reject,notify) {
            var urlLoader:egret.URLLoader = new egret.URLLoader();
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
                var data:any = egret.XML.parse(event.target.data);
                
                let tmxTileMap = new tiled.TMXTilemap(width, height, data, url);
                tmxTileMap.render();
                self._parseTMXTilemap(txtTileMap);
                self.addChild(txtTileMap);
                resolve(self);
            }, url);
            
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event:egret.Event):void {
                reject('加载地图失败');
            }, this);
            
            urlLoader.load(new egret.URLRequest(url));
        });
    }
    
    private _parseTMXTilemap(tmxTileMap:tiled.TMXTilemap) {
        this._spriteWidth  = tmxTileMap.tilewidth();
        this._spriteHeight = tmxTileMap.tileheight();
        
        let layers: Array<any> = this.getLayers();
        
        let pathLayer:tiled.TMXLayer = <tiled.TMXLayer>layers[1];
        for(let i = 0; i < pathLayer.rows(); i++) {
            for(let j = 0; j < pathLayer.cols(); j++) {
                let tileId = pathLayer.getTileId(i, j);
                if (tileId == this._entranceTileId) {
                    this._grid[i][j] = 5;
                } else if (tileId == this._exitTileId) {
                    this._grid[i][j] = 6;
                } else if (tileId == this._pathId) {
                    this._grid[i][j] = 1;
                } else {
                    this._grid[i][j] = 0;
                }
            }
        }
        
        let baseLayer:tiled.TMXLayer = <tiled.TMXLayer>layers[2];
        for(let i = 0; i < baseLayer.rows(); i++) {
            for(let j = 0; j < baseLayer.cols(); j++) {
                let tileId = baseLayer.getTileId(i, j);
                if (tileId == this._baseTileId) {
                    this._grid[i][j] = 2;
                } else if (tileId == this._baseGuardTileId) {
                    this._grid[i][j] = 3;
                } else if (tileId == this._heroGuardTileID) {
                    this._grid[i][j] = 4;
                }
            }
        }
        
        return tmxTileMap;
    }
    
    public movable(x: number, y: number): boolean {
        x = Math.round(x / this._spriteWidth);
        y = Math.round(y / this._spriteHeight);
        if (x < this._grid.length && y < this._grid[x].length && this._grid[x][y] == 1) {
            return true;
        } else {
            return false;
        }
    }
    
    public getBasePositions(): number[][] {
        return this._getPositionsByType(2);    
    }
    
    public getBaseGuardPosition(x: number, y: number): number[] {
        return this._getPositionsByType(3);            
    }
    
    public getHeroGuardPositions(): number[][] {
        return this._getPositionsByType(4);          
    }
    
    public getEnemyEntrances(): number[][] {
        return this._getPositionsByType(5);   
    }
    
    public getEnemyExits(): number[][] {
        return this._getPositionsByType(6);         
    }
    
    public getEnemyPaths(): number[][][] {
        let paths = number[][][];
        
        let entrances = this.getEnemyEntrances();
        let exits = this.getEnemyExits();
        
        for(let i = 0; i < entrances.length; i++) {
            for(let j = 0; j < exits.length: j++) {
                let path = this._getEnemyPath(entrances[i], exits[j]);
                if (path && path.length > 0) {
                    paths.push([path[0] * this._spriteWidth, path[1] * this._spriteHeight]);
                }
            }
        }
        
        return paths;
    }
    
    private _getEnemyPath(entrance:number[], exit: number[]): number[][] {
        let path = number[][];
        
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
                    positions.push([i * this._spriteWidth, j * this._spriteHeight]);
                }
            }
        }
        
        return positions;           
    }
}
