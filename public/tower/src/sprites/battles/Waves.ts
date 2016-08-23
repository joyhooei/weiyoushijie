class Waves {
    private _rounds: number;
    
    private _enemies: any[][];
    
    //当前一波敌人
    private _currentWave: number;
    
    //下一波敌人发动攻击时间
    private _timeToNextWave: number;
    
    //两波敌人发动攻击的时间间隔
    private _timeBetweenWaves: number; 
    
    public constructor() {
        this._enemies = [];
        this._currentWave = 0;
        
        this._timeToNextWave = 1000;
        this._timeBetweenWaves = 1000;
        
        this._rounds = 0;
    }
    
    public add(wave:number, claz:string, count:number, paths:number[][]) {
        this._enemies[wave] = this._enemies[wave] || [];
        this._enemies[wave].push([count, claz, paths]);
    }
    
    private _randomPaths(paths: number[][]): number[][]{
        let pathWidth = 30;
        let enemyInterval = 20;
        
        let deltaY = Math.random() * pathWidth - pathWidth / 2;
        let deltaX = Math.random() * pathWidth - pathWidth / 2;
        
        let newPaths = [];
        for(let j = 0; j < paths.length - 1; j++) {
            newPaths.push([paths[j][0] + deltaX, paths[j][1] + deltaY]);
        }
        
        let direction = Entity.direction4(paths[paths.length - 2][0], paths[paths.length - 2][1], paths[paths.length - 1][0], paths[paths.length - 1][1]);
        switch(direction) {
            case EntityDirection.east:
            case EntityDirection.west:
                deltaX = 0;
                break;
                
            case EntityDirection.north:
            case EntityDirection.south:
                deltaY = 0;
                break;
        }
        newPaths.push([paths[paths.length - 1][0] + deltaX, paths[paths.length - 1][1] + deltaY]);        
        
        return newPaths;
    }
    
    public launchNow(cycle?:boolean) {
        let wave = this._enemies[this._currentWave];
        for(let i = 0; i < wave.length; i++) {
            let count = <number>wave[i][0] * (1 + this._rounds * 0.5);
            let claz  = <string>wave[i][1];
            let paths = <number[][]>wave[i][2];
            for(let j = 0; j < count; j++) {
                let enemy = <Enemy>application.pool.get(claz, {"paths": this._randomPaths(paths)});
                application.battle.addEnemy(enemy);
            }
        }
        
        this._currentWave ++;
        this._timeToNextWave = this._timeBetweenWaves; 
    }
    
    public launch(cycle?:boolean) {
        if (this._nextWave(cycle)) {
            if (this._timeToNextWave <= 0) {
                this.launchNow(cycle);
            } else if (this._timeToNextWave == this._timeBetweenWaves) {
                let wave = this._enemies[this._currentWave];
                for(let i = 0; i < wave.length; i++) {
                    let paths = <number[][]>wave[i][2];
                    for(let j = 0; j < paths.length; j++) {
                        let tip = application.pool.get("LaunchTip", {"dyingTicks":this._timeBetweenWaves});
                        let direction = Entity.direction4(paths[0][0], paths[0][1], paths[1][0], paths[1][1]);
                        switch(direction) {
                            case EntityDirection.east:
                                tip.x = paths[0][0] + 50;
                                tip.y = paths[0][1];
                                break;
                                
                            case EntityDirection.west:
                                tip.x = paths[0][0] - 50;
                                tip.y = paths[0][1];
                                break;
                                
                            case EntityDirection.north:
                                tip.x = paths[0][0];
                                tip.y = paths[0][1] - 50;
                                break;
                                
                           case EntityDirection.south:
                                tip.x = paths[0][0];
                                tip.y = paths[0][1] + 50;
                                break;
                        }

                        application.battle.addEntity(tip);
                    }
                }
            }

            this._timeToNextWave --;
        }
    }
    
    private _nextWave(cycle?:boolean): boolean {
        if (this._currentWave >= this._enemies.length) {
            if (cycle) {
                this._currentWave = 0;
                
                this._rounds += 1;
            } else {
                application.battle.erase();
                
                return false;
            }
        }
        
        return true;
    }
}
