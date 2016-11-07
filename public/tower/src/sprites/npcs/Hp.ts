class Hp extends Entity {
    private _maxHp: number;
    
    private _hp: number;
    
    private _cureSpeed: number;
    
	public constructor() {
        super();
	}
	
	public initialize(properties:any) {
		super.initialize(properties);

		let hp = this._get(properties, "hp", [5, 10, 15]);
		if (egret.getQualifiedClassName(hp) == "Array") {
			let difficulty = application.battle.getDifficulty();
			if (difficulty <= hp.length) {
				this.setMaxHp(hp[difficulty - 1]);
			} else {
	    		this.setMaxHp(hp[hp.length - 1]);
			}
		} else {
			this.setMaxHp(hp);
		}
	    
	    this._cureSpeed = this._get(properties, "cureSpeed", 1);
	}
	
	public setMaxHp(hp: number) {
		this._maxHp = hp;
		this._hp = hp;
	}

	public addMaxHp(hp: number) {
		this._maxHp += hp;
		this._hp += hp;
	}

	public getMaxHp(): number {
		return this._maxHp;
	}

	public getHp(): number {
		return this._hp;
	}
	
	public kill() {
		this.setHp(0);
	}
	
	public cure() {
		this.setHp(this._hp + this._cureSpeed);
	}

	public damage(force:number): boolean{
	    return this.setHp(this._hp - force);
	}
	
	public setHp(hp:number): boolean {
		hp = Math.max(0, Math.min(this._maxHp, hp));
		if (hp != this._hp) {
	        this._hp = hp;
	        this.stain();
		}
		
		return this._hp <= 0;
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
