class Queue {
    private _claz: string;
    
    private _count: number;
    
    public constructor(claz: string, count: number) {
        this._claz = claz;
        this._count = count;
    }
   
    public launch(path: number[][], idleTicks: number) {
        for(let j = 0; j < this._count; j++) {
            let enemy = <Enemy>application.pool.get(this._claz, {"paths": this._randomPath(path), idleTicks: idleTicks + Math.random() * (application.frameRate << 2)});
            application.battle.addEnemy(enemy);
        }
    }
    
    private _randomPath(path: number[][]): number[][]{
        let pathWidth = 30;
        let enemyInterval = 20;
        
        let entityWidth = 30;
        
        let deltaY = Math.random() * pathWidth - pathWidth / 2;
        let deltaX = Math.random() * pathWidth - pathWidth / 2;
        
        let newPath = [];
        
        let direction = Entity.direction4(path[0][0], path[0][1], path[1][0], path[1][1]);
        switch(direction) {
            case EntityDirection.east:
                newPath.push([-entityWidth, path[0][1] + deltaY]);
                break;
                
            case EntityDirection.west:
                newPath.push([this._mapWidth + entityWidth, path[0][1] + deltaY]);
                break;
                
            case EntityDirection.south:
                newPath.push([path[0][0] + deltaX, -entityWidth]);
                break;
                
            case EntityDirection.north:
                newPath.push([path[0][0] + deltaX, this._mapHeight + entityWidth]);
                break;
        }
        
        for(let j = 1; j < path.length - 1; j++) {
            newPath.push([path[j][0] + deltaX, path[j][1] + deltaY]);
        }
        
        direction = Entity.direction4(paths[path.length - 2][0], path[path.length - 2][1], path[path.length - 1][0], path[path.length - 1][1]);
        switch(direction) {
            case EntityDirection.east:
                newPath.push([this._mapWidth, path[path.length - 1][1] + deltaY]);        
                break;
                
            case EntityDirection.west:
                newPath.push([0, path[path.length - 1][1] + deltaY]);        
                break;
                
            case EntityDirection.north:
                 newPath.push([path[path.length - 1][0] + deltaX, 0]);
                 break;
                 
            case EntityDirection.south:
                newPath.push([path[path.length - 1][0] + deltaX, this._mapHeight]);
                break;
        }

        return newPath;
    }    
}
