class TiledMap extends Entity {
    private _txtTileMap: tiled.TMXTilemap;
    
    public load(url: string, width:number, height:number) : Q.Promise<any> {
        let self = this;

        return Q.Promise<any>(function(resolve,reject,notify) {
            var urlLoader:egret.URLLoader = new egret.URLLoader();
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
                var data:any = egret.XML.parse(event.target.data);
                
                self.tmxTileMap = new tiled.TMXTilemap(width, height, data, url);
                self.tmxTileMap.render();
                resolve(tmxTileMap);
            }, url);
            
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event:egret.Event):void {
                reject('加载地图失败');
            }, this);
            
            urlLoader.load(new egret.URLRequest(url));
        });         
    }
    
    public movable(x: number, y: number): boolean {
        return true;
    }
    
    public getBasePositions(): number[][] {
        let positions = [][];
        
        return positions;
    }
    
    public getBaseGuardPosition(x: number, y: number): number[] {
    }
    
    public getHeroGuardPosition(): number[] {
    }
    
    public getEnemyEntrances(): number[][] {
    }
    
    public getEnemyExit(): number[][] {
    }
    
    public searchEnemyPath(x: number, y:number) paths[][] {
    }
}
