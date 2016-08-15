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
        return this._altitude;
    }
    
    public kill() {
        this._hp.kill();
        this._do(EntityState.dying);
    }
    
    public hitBy(damage:number): boolean {
        if (this._hp.hitBy(damage) <= 0) {
            this._do(EntityState.dying);
            
            return true;
        } else {
            return false;
        }
    }
    
    public paint() {
        super.paint();
        
        this._hp.paint();
    }
    
    protected _face(npc:NPC) {
        this._turn(this._direction8(npc.x, npc.y));
    }
}
