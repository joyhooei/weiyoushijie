class Waves {
    private _mapWidth: number;
    private _mapHeight: number;
    
    private _rounds: number;
    
    private _enemies: Queue[][][];

    private _paths: number[][][];
    
    //当前一波敌人
    private _currentWave: number;
    
    //两波敌人发动攻击的时间间隔
    private _ticksBetweenWaves: number;

    private _ticksBetweenQueues: number;

    private _launchTicks: number;

    private _tips: LaunchTip[];
    
    public constructor(mapWidth: number, mapHeight: number) {
        this._mapWidth  = mapWidth;
        this._mapHeight = mapHeight;
        
        this._running = false;
    }

    public setPaths(paths: number[][][]) {
        this._paths = paths;
        
        this._enemies = [];
        this._currentWave = -1;
        
        this._rounds = 0;

        this._ticksBetweenWaves = 40 * application.frameRate;
        this._ticksBetweenQueues = 4 * application.frameRate;
        
        this._launchTicks = 0;
        
        this._tips = [];
    }
    
    public getCurrentWave(): number {
        return this._rounds * this._enemies.length + this._currentWave;
    }
    
    public add(wave:number, claz:string, count:number, path: number) {
        this._enemies[wave] = this._enemies[wave] || [];
        this._enemies[wave][path] = this._enemies[wave][path] || [];
        
        this._enemies[wave][path].push(new Queue(claz, count));
    }
    
    public launchFirstWave() {
        this._currentWave = 0;
        this.launchWave(this._currentWave);
    }

    public launchWave(wave: number) {
        for(let i = 0; i < this._tips.length; i++) {
            this._tips[i].erase();
        }
        this._tips = [];
        
        this._launchTicks = 0;
        for(let p = 0; p < this._enemies[wave].length; p++) {
            let idleTicks:number = 0;
            
            for(let q = 0; q < this._enemies[wave][p].length; q++) {
                queues[q].launch(this._paths[p], idleTicks);
                
                idelTicks += this._ticksBetweenQueues;
            }
            
            if (this._launchTicks < idleTicks) {
                this._launchTicks = idleTicks;
            }
        }
    }
    
    public launch(cycle?:boolean): boolean {
        //上一波还没有全部走出来
        this._launchTicks --;
        if (this._launchTicks > 0) {
            return false;
        }
        
        //检查是否有下一波游戏
        if (false == this._nextWave(cycle)) {
            return true;
        }

        return false;
    }
    
    private _addWaveTips(wave:number) {
        for(let p = 0; p < this._enemies[wave].length; p++) {
            let tip = <Tip>application.pool.get("LaunchTip", {dyingTicks:this._ticksBetweenWaves, wave: wave});

            let path = this._paths[p];
            let direction = Entity.direction4(path[0][0], path[0][1], path[1][0], path[1][1]);
            switch(direction) {
                case EntityDirection.east:
                    tip.x = 20;
                    tip.y = path[0][1];
                    break;
                    
                case EntityDirection.west:
                    tip.x = this._mapWidth - tip.width - 20;
                    tip.y = path[0][1];
                    break;
                    
                case EntityDirection.north:
                    tip.x = path[0][0];
                    tip.y = this._mapHeight - tip.height - 20;
                    break;
                    
                case EntityDirection.south:
                    tip.x = path[0][0];
                    tip.y = 20;
                    break;
            }

            application.battle.addEntity(tip);
            this._tips.push(tip);
        }
    }        
    
    private _nextWave(cycle?:boolean): boolean {
        if (this._currentWave < this._enemies.length - 1) {
            this._currentWave ++;
        } else {
            if (cycle) {
                this._currentWave = 0;
                this._rounds += 1;
            } else {
                return false;
            }
        }
        
        this._addWaveTips(this._currentWave);
        application.dao.dispatchEventWith("Battle", true, {waves: this.getCurrentWave()});
        return true;
    }
}
