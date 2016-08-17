class NPC extends MovableEntity {
    protected _hp: Hp;
    
    protected _damage: number;
    
    protected _hitSpeed: number;

    //海拔高度，地表：0，地下：-1，空中：1
    protected _altitude: number;

    public constructor() {
        super();
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hp = application.pool.get("Hp", properties);
        this._hp.width = 18;
        this.addChild(this._hp);
        
        this._damage    = this._get(properties, "damage", 10);
        this._hitSpeed  = this._get(properties, "hitSpeed", 10);
        
        this._altitude  = this._get(properties, "altitude", 0);

        this._idleTicks = Math.random() * 100;
    }
    
    public getAltitude(): number {
        return this._altitude;
    }
    
    public kill() {
        this._hp.erase();
        this.removeChild(this._hp);
        this._hp = null;

        super.kill();
    }
    
    public hitBy(damage:number): boolean {
        if (this.active()) {
            if (this._hp.hitBy(damage) <= 0) {
                this.kill();
                
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    
    public paint() {
        super.paint();
        
        if (this._hp) {
            this._hp.paint();
        }
    }
    
    protected _face(npc:NPC) {
        this._turn(this._direction8(npc.x, npc.y));
    }
}
