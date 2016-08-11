class NPC extends MovableEntity {
    protected _hp: Hp;
    
    protected _damage: number;
    
    protected _hitSpeed: number;

    //海拔高度，地表：0，地下：-1，空中：1
    protected _altitude: number;

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
        
        this._damage    = this._get(properties, "damage", 10);
        this._hitSpeed  = this._get(properties, "hitSpeed", 10);
        
        this._altitude  = this._get(properties, "altitude", 0);

        this._idleTicks = Math.random() * 100;
    }
    
    public getAltitude(): number {
        return _altitude;
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
}
