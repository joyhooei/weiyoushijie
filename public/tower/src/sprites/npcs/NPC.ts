class NPC extends MovableEntity {
    protected _hp: Hp;
    
    protected _force: number;

    protected _armor: number;
    
    protected _resistance: number;
    
    protected _hitSpeed: number;

    protected _skill : number;
    
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
        
        this._skill = 0;
        
        this._hitSpeed  = this._get(properties, "hitSpeed", 900);
        
        this._force    = this._get(properties, "force", 10);

        this._armor  = this._get(properties, "armor", 0);
        
        this._resistance  = this._get(properties, "_resistance", 0);
        
        this._altitude  = this._get(properties, "altitude", 0);
    }
    
    public getForce(): number {
    	return this._force;
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
    	return this.damage(bullet._actualForce(npc.getForce()));
    }

    public hitBy(npc: NPC): boolean {
    	this.fight();
    	
    	let d = npc.getForce();
    	
    	if (this._resistance > 0) {
    		npc.damage(Math.round(d * (100 - this._resistance) / 100));
    	}
    	
    	return this.damage(this._actualForce(d));
    }
    
    protected _actualForce(d: number): number {
    	return Math.round(d * (100 - this._armor) / 100);
    }
    
    public damage(d: number): boolean {
        if (this.active()) {           
            if (this._hp.hitBy(d)) {
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
    
    protected _readyFight() {
    	return this._state == EntityState.fighting && this._ticks % this._hitSpeed == 0;
    }

    protected _fighting() {
        if (this._readyFight()) {
        	this._playFightMovieClip();
        }
    }
    
    protected _playFightMovieClip() {
        let clip:egret.MovieClip = this._play(this._displayEntity.getChildAt(0), 1);
        if (clip) {
        	clip.once(egret.Event.COMPLETE, function(){
        		this._hitOpponents();
        	}, this);
        }
    }
    
    protected _hitOpponents() {
    }
    
    public paint() {
    	let display = this._render(0, this._hp.height + 2, this._skill);
    	
    	if (this._state != EntityState.fighting) {
    		this._play(display, -1);	
    	}
    	
        this._centerHp();
    }
    
    protected _centerHp() {
    	let x =  Math.min(0, (this.width - this._hp.width) >> 1);
        if (x != this._hp.x) {
        	this._hp.x = x;
        }
    }
}
