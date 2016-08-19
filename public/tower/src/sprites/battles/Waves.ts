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
        this._enemies[wave].push([count, claz, this._randomPaths(paths)]);
    }
    
    private _randomPaths(paths: number[][]): number[][]{
        let pathWidth = 60;
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
    
    public erase() {
        this._enemies = [];
    }
    
    public launch(cycle?:boolean) {
        if (this._currentWave >= this._enemies.length) {
            if (cycle) {
                this._currentWave = 0;
                
                this._rounds += 1;
            } else {
                application.battle.kill();
                
                return;
            }
        }
        
        this._timeToNextWave --;
        if (this._timeToNextWave <= 0) {
            let wave = this._enemies[this._currentWave];
            for(let i = 0; i < wave.length; i++) {
                let count = <number>wave[i][0] * (1 + this._rounds * 0.5);
                let claz  = <string>wave[i][1];
                let paths = <number[][]>wave[i][2];
                for(let j = 0; j < count; j++) {
                    let enemy = <Enemy>application.pool.get(claz, {"paths": paths});
                    application.battle.addEnemy(enemy);
                }
            }
            
            this._currentWave ++;
            this._timeToNextWave = this._timeBetweenWaves;
        }
    }
}
