class Bullet extends MovableEntity {
    private _target: NPC;

    private _missing: boolean;
    
    private _damage: number;
    
    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._target = null;
        this._missing = false;
        
        this._damage = this._get(properties, 'damage', 10);
    }
    
    public setTarget(target: NPC) {
        this._target = target;
        
        if (this._paths.length != 2 || this._paths[1][0] != target.x || this._paths[1][1] != target.y)) {
            this.setPaths([[this.x, this.y], [target.x, target.y]]);
        }
    }
    
    protected _moving() {
        if (this._moveOneStep()) {
            if (this._target.dying() || this._target.dead()) {
                this._missing = true;
            } else {
                this._missing = false;
                
                this._target.hitBy(this._damage);
            }
                
            this._do(EntityState.dying);
        } else {
            this.setTarget(this._target);
        }
    }
    
    protected _dying() {
        if (this._ticks > 3) {
            this._do(EntityState.dead);
        }
    }
}
