class Hp extends Entity {
    private _maxHp: number;
    
    private _hp: number;
    
    private _cureSpeed: number;
    
	public constructor() {
        super();
	}
	
	public initialize(properties:any) {
		super.initialize(properties);
		
	    this._maxHp = this._get(properties, "hp", 100);
	    this._hp = this._maxHp;
	    
	    this._cureSpeed = this._get(properties, "cureSpeed", 10);

		this.stain();
	}
	
	public kill() {
		this._setHp(0);
	}
	
	public cure() {
		this._setHp(this._hp + this._cureSpeed);
	}

	public hitBy(damage:number): boolean{
	    this._setHp(this._hp - damage);
	    
	    return hp <= 0;
	}
	
	private _setHp(hp:number): boolean {
		let hp = math.max(0, math.Min(this._maxHp, hp));
		if (hp != this._hp) {
	        this._hp = hp;
	        
	        this.stain();
		}		
	}
	
	public paint() {
        this.graphics.clear();
        
        let percent = this._hp / this._maxHp;
        if (percent >= 0.5) {
            this.graphics.beginFill(0x00EC00);
        } else if (percent >= 0.1) {
            this.graphics.beginFill(0xFFED97);
        } else {
            this.graphics.beginFill(0xff0000);
        }
        
        this.graphics.drawRect(0, 0, percent * this.width, this.height);
        
        this.graphics.endFill();
	}
}
