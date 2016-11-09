class ArrowTower1 extends ArrowTower {
    public constructor() {
        super();
        
        this.addBitmap("arrowtower1_png");
        
        this._bulletClaz = "Arrow1";
    }
    
	public getPrice(): number {
        if (this._skill && this._skill.attrs.level == 2) {
            return this._price - 10;
        } else {
		    return this._price;
        }
	}    

    public getMuzzleX(): number {
        return this.x + 25 + 15;
    }

    public getMuzzleY(): number {
        return this.y + 7;
    }
}
