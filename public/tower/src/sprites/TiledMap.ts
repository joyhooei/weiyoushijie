class TiledMap extends Entity {
    private _map: number[][];
    
    private _spriteWidth: number;
    
    private _spriteHeight: number;
    
    public constructor(spriteWidth: number, spriteHeight: number) {
        this._spriteHeight = spriteHeight;
        this._spriteWidth  = spriteWidth;
        
        this._map = [][];
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
                resolve(self._parseTMXTilemap(tmxTileMap));
            }, url);
            
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event:egret.Event):void {
                reject('加载地图失败');
            }, this);
            
            urlLoader.load(new egret.URLRequest(url));
        });
    }
    
    private _parseTMXTilemap(tmxTileMap:tiled.TMXTilemap) {
        return tmxTileMap;
    }
    
    public movable(x: number, y: number): boolean {
        x = Math.round(x / this._spriteWidth);
        y = Math.round(y / this._spriteHeight);
        if (x < this._map.length && y < this._map[x].length && this._map[x][y] == 1) {
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
        
        
        
        return path;
    }
    
    private _getPositionsByType(type:number) : number[][] {
        let positions = [][];
        
        for(let i = 0; i < this._map.length; i++) {
            for(let j = 0; j < this._map[i].length; j++) {
                if (this._map[i][j] == type) {
                    positions.push([i * this._spriteWidth, j * this._spriteHeight]);
                }
            }
        }
        
        return positions;           
    }
}
