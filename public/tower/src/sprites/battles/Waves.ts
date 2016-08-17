class Waves {
    protected _enemies: Enemy[][];
    
    //当前一波敌人
    protected _currentWave: number;
    
    //下一波敌人发动攻击时间
    protected _timeToNextWave: number;
    
    //两波敌人发动攻击的时间间隔
    protected _timeBetweenWaves: number; 
    
    public constructor() {
        this._enemies = [];
        this._currentWave = 0;
        this._timeToNextWave = 1000;
        this._timeBetweenWaves = 1000;
    }
    
    public add(wave:number, className:string, count:number, paths:number[][]) {
        this._enemies[wave] = this._enemies[wave] || [];

        for(let i = 0; i < count; i++) {
            this._enemies[wave].push(<Enemy>application.pool.get(className, {"paths": paths}));
        }
    }
    
    public erase() {
        for(let i = 0; i < this._enemies.length; i++) {
            for(let j = 0; j < this._enemies[i].length; j++) {
                this._enemies[i][j].erase();
            }
        }
    }
    
    public launch() {
        if (this._currentWave >= this._enemies.length) {
            application.battle.erase();
        } else {
            this._timeToNextWave --;
            if (this._timeToNextWave <= 0) {
                for(let i = 0; i < this._enemies[this._currentWave].length; i++) {
                    application.battle.addEnemy(this._enemies[this._currentWave][i]);
                }
                this._enemies[this._currentWave] = [];
                
                this._currentWave ++;
                this._timeToNextWave = this._timeBetweenWaves;
            }
        }
    }
}
