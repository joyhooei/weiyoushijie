class NPC extends MovableEntity {
    protected _hp: Hp;
    
    protected _damage: number;
    
    protected _hitSpeed: number;
    
    //所有路径
    protected _paths: number[][];
    //当前路径
    protected _path: number;

    public constructor() {
        super();
        
        this._hp = new Hp();
        this._hp.width = 18;
        this._hp.horizontalCenter = 0;
        this.addChild(this._hp);
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hp.initialize(properties);
        
        this._damage    = properties.damage;
        this._hitSpeed  = properties.hitSpeed;
    }

    public setPaths(paths:number[][]) {
        this._paths = paths;
        this._path  = 0;
    }
    
    protected _stateChanged(oldState:EntityState, newState:EntityState) {
        if (newState == EntityState.moving) {
            let path:number[] = this._paths[this._path];
            this._turn(this._direction8(path[0], path[1]));
        }
        
        super._stateChanged(oldState, newState);
    }

    protected _dying() {
        if (this._ticks >= 5) {
            this._do(EntityState.dead);
        }
    }
    
    public hitBy(damage:number) {
        if (this._hp.hitBy(damage) <= 0) {
            this._do(EntityState.dying);
        }

        if (this._state != EntityState.fighting) {
            this._do(EntityState.fighting);
        }
    }
    
    protected _hit(npc: NPC) {
        npc.hitBy(this._damage);
    }
    
    protected _paint() {
        super._paint();
        
        this._hp._paint();
    }
    
    //走一步
    protected _moveOneStep(): boolean {
        var path = this._paths[this._path];
        if (Math.abs(this.x - path[0]) < this._step && Math.abs(this.y - path[1]) < this._step) {
            if (this._path >= this._paths.length - 1) {
                //到达终点
                return true;
            }
            
            this._path ++;
            
            path = this._paths[this._path];
            this._turn(this._direction8(path[0], path[1]));
            
            this._computeSteps(path[0], path[1]);
        }
        
        return super._moveOneStep();
    }    
}
