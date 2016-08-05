class NPC extends MovableEntity {
    private _hp: number;
    
    private _damage: number;
    
    private _hitSpeed: number;
    
    //所有路径
    private _paths: number[][][];
    //当前路径
    private _path: number;

    public constructor() {
        super();
    }

    public setPaths(paths:number[][][]) {
        this._paths = paths;
        this._path  = 0;
    }
    
    protected _stateChanged(oldState:EntityState, newState:EntityState) {
        if (newState == EntityState.moving) {
            let path = this._paths[this.path];
            this._turn(this._direction8(path.x, path.y));
        }
        
        super._stateChanged(oldState, newState);
    }
    
    protected _idle() {
        this._do(EntityState.moving);
    }

    protected _dying() {
        if (ticks >= 5) {
            this._do(EntityState.dead);
        }
    }
    
    public hitBy(damage:number) {
        this._hp -= damage;
        if (this._hp < 0) {
            this._do(EntityState.dying);
        }
        
        if (this._state != EntityState.fighting) {
            this._do(EntityState.fighting);
        }
    }
    
    private _hit(npc: NPC) {
        npc.hitBy(this._damage);
    }
    
    //走一步
    private _moveOneStep(): bool {
        var path = this._paths[this.path];
        if (Math.abs(this.x - path[0]) < this._step && Math.abs(this.y - path[1]) < this._step) {
            if (this._path >= this._paths.length - 1) {
                //到达终点
                return true;
            }
            
            this._path ++;
            
            path = this._paths[this._path];
            this._turn(this._direction8(path[0], path[1]));
            
            this._steps(path[0], path[1]);
        }
        
        this.x += this._steps[0];
        this.y += this._steps[1];
        
        return false;
    }    
}
