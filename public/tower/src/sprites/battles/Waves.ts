class Waves {
    private _mapWidth: number;
    private _mapHeight: number;
    
    private _rounds: number;
    
    private _enemies: any[][];
    
    //当前一波敌人
    private _currentWave: number;
    
    //两波敌人发动攻击的时间间隔
    private _timeBetweenWaves: number; 

    private _launching: boolean;
    
    public constructor(mapWidth: number, mapHeight: number) {
        this._enemies = [];
        this._currentWave = 0;
        
        this._timeBetweenWaves = 10 * application.frameRate;
        
        this._rounds = 0;

        this._launching = false;
        
        this._mapWidth  = mapWidth;
        this._mapHeight = mapHeight;
    }
    
    public getCurrentWave(): number {
        return this._rounds * this._enemies.length + this._currentWave;
    }
    
    public add(wave:number, claz:string, count:number, paths:number[][]) {
        this._enemies[wave] = this._enemies[wave] || [];
        this._enemies[wave].push([count, claz, paths, 0]);
    }
    
    private _randomPaths(paths: number[][]): number[][]{
        let pathWidth = 30;
        let enemyInterval = 20;
        
        let entityWidth = 50;
        
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

    public launchQueue(w: number, queue:number) {
        let wave = this._enemies[w];
        if (wave[queue][3] == 1) {
            return;
        }

        let count = <number>wave[queue][0] * (1 + this._rounds * 0.5);
        let claz  = <string>wave[queue][1];
        let paths = <number[][]>wave[queue][2];
        for(let j = 0; j < count; j++) {
            let enemy = <Enemy>application.pool.get(claz, {"paths": this._randomPaths(paths)});
            application.battle.addEnemy(enemy);
        }

        wave[queue][3] = 1;

        this._launching = false;
    }
    
    public launch(cycle?:boolean) {
        if (this._launching || !this._nextWave(cycle)) {
            return ;
        }
        
        this._launching = true;
        
        let wave = this._enemies[this._currentWave];
        for(let i = 0; i < wave.length; i++) {
            let paths = <number[][]>wave[i][2];
            let tip = <Tip>application.pool.get("LaunchTip", {dyingTicks:this._timeBetweenWaves, queue: i, wave: this._currentWave});
            let direction = Entity.direction4(paths[0][0], paths[0][1], paths[1][0], paths[1][1]);
            switch(direction) {
                case EntityDirection.east:
                    tip.x = 50;
                    tip.y = paths[0][1];
                    break;
                    
                case EntityDirection.west:
                    tip.x = this._mapWidth - tip.width - 50;
                    tip.y = paths[0][1];
                    break;
                    
                case EntityDirection.north:
                    tip.x = paths[0][0];
                    tip.y = this._mapHeight - tip.height - 50;
                    break;
                    
                case EntityDirection.south:
                    tip.x = paths[0][0];
                    tip.y = 50;
                    break;
            }

            application.battle.addEntity(tip);
        }
    }
    
    private _nextWave(cycle?:boolean): boolean {
        if (this._currentWave < this._enemies.length) {
            this._currentWave ++;
        } else {
            if (cycle) {
                this._currentWave = 0;
                this._rounds += 1;
                
                for(let w = 0; w < this._enemies.length; w++) {
                    for(let q = 0; q < this._enemies[w].length; q++) {
                        this._enemies[w][q][3] = 0;
                    }
                }
            } else {
                application.battle.win();
                return false;
            }
        }
        
        application.dao.dispatchEventWith("Battle", true, {waves: this.getCurrentWave()});
        
        return true;
    }
}
