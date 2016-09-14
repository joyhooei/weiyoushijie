class NPC extends MovableEntity {
    protected _hp: Hp;
    
    protected _damage: number;
    
    protected _armor: number
    
    protected _hitSpeed: number;

    //海拔高度，地表：0，地下：-1，空中：1
    protected _altitude: number;

    public constructor() {
        super();
    }
    
	protected _idle() {
    	if (this._ticks >= this._idleTicks) {
        	this.move();
        	
        	if (this._hp) {
        		this._hp.move();
        	}
    	}
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._hp = <Hp>application.pool.get("Hp", properties);
		this._hp.height = 3;
		this._hp.width  = 20;
		this._hp.x = 0;
		this._hp.y = 0;
        this.addChild(this._hp);
        
        this._damage    = this._get(properties, "damage", 10);
        this._hitSpeed  = this._get(properties, "hitSpeed", 10);
        
        this._altitude  = this._get(properties, "altitude", 0);
        
        this._armor  = this._get(properties, "armor", 0);
    }
    
    public getDamage(): number {
    	return this._damage;
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
    
    public shootBy(bullet: Bullet): boolean {
    	return this._hit(bullet._actualDamage(npc.getDamage()));
    }

    public hitBy(npc: NPC): boolean {
    	return this._hit(this._actualDamage(npc.getDamage()));
    }
    
    protected _actualDamage(damage: number): number {
    	return Math.round(damage * (100 - this._armor) / 100);
    }
    
    protected _hit(damage: number): boolean {
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

    public paint() {
        this._display(0, this._hp.height + 2);
        this._centerHp();
    }
    
    protected _centerHp() {
    	let x =  Math.min(0, (this.width - this._hp.width) >> 1);
        if (x != this._hp.x) {
        	this._hp.x = x;
        }
    }
}
