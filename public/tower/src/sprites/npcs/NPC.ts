class NPC extends Object {
    private _hp: number;
    
    private _damage: number;
    
    private _hitSpeed: number;
    
    //所有路径
    private _paths: number[][][];
    private _path: number;
    
    //一步走多远
    private _step: number;
    //一步走的距离    
    private _stepX: number;
    private _stepY: number;
    
    private _direction: ObjectDirection;
    
    public constructor() {
        super();
    }

    public setPaths(paths:number[][][]) {
        this._paths = paths;
        this._path  = 0;
    }
    
    protected _idle(ticks: number) {
        this._changeState(ObjectState.moving);
    }

    protected _dying(ticks: number) {
        if (ticks >= 5) {
            this._changeState(ObjectState.dead);
        }
    }
    
    public hitBy(damage:number) {
        this._hp -= damage;
        if (this._hp < 0) {
            this._changeState(ObjectState.dying);
        }
    }
    
    private _hit(npc: NPC) {
        npc.hitBy(this._damage);
    }
    
    private _moveTo(x:number, y:number) {
        this.setPath([[this.x, this.y], [x, y]]);
        this._changeState(ObjectState.moving);
    }
    
    private _moveOneStep(): bool {
        var path = this._paths[this.path];
        if (Math.abs(this.x - path.x) < this._step && Math.abs(this.y - path.y) < this._step) {
            if (this._path >= this._paths.length - 1) {
                //到达终点
                return true;
            }
            
            this._path ++;
            
            path = this._paths[this._path];;
            this._direction = this._direction8(path.x, path.y);
            
            let dx = Math.abs(this.x - path.x);
            let dy = Math.abs(this.y - path.y);
            if (dx >= dy) {
                this._stepX = this._step;
                if (path.x < this.x) {
                    this._stepX = 0 - this._stepX;
                }
                
                this._stepY = dy / (dx / this._stepX);
                if (path.y < this.y) {
                    this._stepY = 0 - this._stepY;
                }
            } else {
                 this._stepY = this._step;
                if (path.y < this.y) {
                    this._stepY = 0 - this._stepY;
                }
                
                this._stepX = dx / (dy / this._stepY);
                if (path.x < this.x) {
                    this._stepX = 0 - this._stepX;
                }                   
            }
        }
        
        this.x += this._stepX;
        this.y += this._stepY;
        
        return false;
    }
}
