class NPC extends MovableEntity {
    protected _hp: Hp;
    
    protected _damage: number;
    
    protected _hitSpeed: number;

    //海拔高度，地表：0，地下：-1，空中：1
    protected _altitude: number;

    public constructor() {
        super();

        this.width = this.height = 20;
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hp = <Hp>application.pool.get("Hp", properties);
        this.addChild(this._hp);
        
        this._damage    = this._get(properties, "damage", 10);
        this._hitSpeed  = this._get(properties, "hitSpeed", 10);
        
        this._altitude  = this._get(properties, "altitude", 0);

        this._idleTicks = this._get(properties, "idleTicks", Math.random() * 100);
    }

    public kill() {
        this._hp.erase();
        this._hp = null;

        super.kill();
    }

    public erase() {
        if (this._hp) {
            this._hp.erase();
            this._hp = null;
        }

        super.erase();
    }

    public hitBy(damage:number): boolean {
        if (this.active()) {           
            if (this._hp.hitBy(damage)) {
                this.kill();
                
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    
    public reachable(x: number, y: number, radius: number, altitudes: number[]): boolean {
        return this.active() && this._altitude in altitudes && this.within(x, y, radius);
    }

    protected _face(npc:NPC) {
        this._turn(this._direction4(npc.x, npc.y));
    }
}
