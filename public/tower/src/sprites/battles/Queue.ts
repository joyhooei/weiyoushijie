class Queue {
    private _claz: string;
    
    private _count: number;
    
    private _launched: boolean;
    
    public constructor(claz: string, count: number) {
        this._claz = claz;
        this._count = count;
        
        this._launched = false;
    }
    
    public launched(): boolean {
        return _launched;
    }
    
    public cycle() {
        this._launched = false;
    }
    
    public launch(paths: number[][], idleTicks: number) {
        for(let j = 0; j < this._count; j++) {
            let enemy = <Enemy>application.pool.get(this._claz, {"paths": this._randomPaths(paths), idleTicks: idleTicks});
            application.battle.addEnemy(enemy);
        }
        
        this._launched = true;
    }
    
    private _randomPaths(paths: number[][]): number[][]{
        let pathWidth = 30;
        let enemyInterval = 20;
        
        let entityWidth = 30;
        
        let deltaY = Math.random() * pathWidth - pathWidth / 2;
        let deltaX = Math.random() * pathWidth - pathWidth / 2;
        
        let newPaths = [];
        
        let direction = Entity.direction4(paths[0][0], paths[0][1], paths[1][0], paths[1][1]);
        switch(direction) {
            case EntityDirection.east:
                newPaths.push([-entityWidth, paths[0][1] + deltaY]);
                break;
                
            case EntityDirection.west:
                newPaths.push([this._mapWidth + entityWidth, paths[0][1] + deltaY]);
                break;
                
            case EntityDirection.south:
                newPaths.push([paths[0][0] + deltaX, -entityWidth]);
                break;
                
            case EntityDirection.north:
                newPaths.push([paths[0][0] + deltaX, this._mapHeight + entityWidth]);
                break;
        }
        
        for(let j = 1; j < paths.length - 1; j++) {
            newPaths.push([paths[j][0] + deltaX, paths[j][1] + deltaY]);
        }
        
        direction = Entity.direction4(paths[paths.length - 2][0], paths[paths.length - 2][1], paths[paths.length - 1][0], paths[paths.length - 1][1]);
        switch(direction) {
            case EntityDirection.east:
                newPaths.push([this._mapWidth, paths[paths.length - 1][1] + deltaY]);        
                break;
                
            case EntityDirection.west:
                newPaths.push([0, paths[paths.length - 1][1] + deltaY]);        
                break;
                
            case EntityDirection.north:
                 newPaths.push([paths[paths.length - 1][0] + deltaX, 0]);
                 break;
                 
            case EntityDirection.south:
                newPaths.push([paths[paths.length - 1][0] + deltaX, this._mapHeight]);
                break;
        }
        
        
        return newPaths;
    }    
}
