class Waves {
    private _mapWidth: number;
    private _mapHeight: number;
    
    private _rounds: number;
    
    private _enemies: Queue[][][];

    private _paths: number[][][];
    
    //当前一波敌人
    private _currentWave: number;
    
    //两波敌人发动攻击的时间间隔
    private _timeBetweenWaves: number; 

    private _launching: boolean;
    
    public constructor(mapWidth: number, mapHeight: number) {
        this._paths = [];
        
        this._enemies = [];
        this._currentWave = -1;
        
        this._timeBetweenWaves = 10 * application.frameRate;
        
        this._rounds = 0;

        this._launching = false;
        
        this._mapWidth  = mapWidth;
        this._mapHeight = mapHeight;
    }

    public setPaths(paths: number[][][]) {
        this._paths = paths;
    }
    
    public getCurrentWave(): number {
        return this._rounds * this._enemies.length + this._currentWave;
    }
    
    public add(wave:number, claz:string, count:number, path: number) {
        this._enemies[wave] = this._enemies[wave] || [];
        this._enemies[wave][path] = this._enemies[wave][path] || [];
        
        this._enemies[wave][path].push(new Queue(claz, count));
    }
    
    public launchFirst() {
        this._currentWave = 0;
        
        let wave = this._enemies[this._currentWave];
        for(let path = 0; path < wave.length; path++) {
            this.launchPath(this._currentWave, path);
        }
    }

    public launchPath(wave: number, path:number) {
        let queues:Queue[] = this._enemies[wave][path];
        for(let q = 0; q < queues.length; q++) {
            if (!queues[q].launched()) {
                queues[q].launch(this._paths[path], q * (application.frameRate << 2));
            }
        }

        //检查是否本波所有怪物都已经出来了
        for(let p = 0; p < this._enemies[wave].length; p++) {
            for(let q = 0; q < this._enemies[wave][p].length; q++) {
                if (!this._enemies[wave][p][q].launched()) {
                    return;
                }
            }
        }
        
        this._launching = false;
    }
    
    public launch(cycle?:boolean) {
        if (this._enemies.length == 0 || this._launching || !this._nextWave(cycle)) {
            return ;
        }
        
        this._launching = true;
        
        let wave = this._enemies[this._currentWave];
        for(let p = 0; p < wave.length; p++) {
            let tip = <Tip>application.pool.get("LaunchTip", {dyingTicks:this._timeBetweenWaves, path: p, wave: this._currentWave});

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
                    for(let p = 0; p < this._enemies[w].length; p++) {
                        for(let q = 0; q < this._enemies[w][p]; q++) {
                            this._enemies[w][p][q].cycle();
                        }
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
