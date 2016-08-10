class Hp extends Entity {
    private _maxHp: number;
    
    private _hp: number;
    
	public constructor() {
        super();
	}
	
	public initialize(properties:any) {
	    this._maxHp = this._get(properties, "maxHp", 100);
	    this._hp = this._maxHp;
	}

	public hitBy(damage:number){
	    let hp = Math.max(0, this._hp - damage);
	    if (hp != this._hp) {
	        this._hp = hp;
	        this._repaint = true;
	    }
	}
	
	protected _paint() {
        this.graphics.clear();
        
        let percent = this._hp / this._maxHp;
        if (percent >= 0.5) {
            this.graphics.beginFill(0x00EC00);
        } else if (percent >= 0.1) {
            this.graphics.beginFill(0xFFED97);
        } else {
            this.graphics.beginFill(0xff0000);
        }
        
        this.graphics.drawRect(0, 0, percent * this.width, 20);
        
        this.graphics.endFill();	
	}
}
