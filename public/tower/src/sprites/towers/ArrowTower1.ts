class ArrowTower1 extends ArrowTower {
    public constructor() {
        super();
        
        this.addBitmap("arrowtower1_png");
        
        this._bulletClaz = "Arrow1";
    }
	
    public initialize(properties:any) {
        super.initialize(properties);
        
        if (this._skill) {
            if (this._skill.attrs.level == 2) {
                this._upgradePrice = this._upgradePrice - 10;
            }
        }
    }	  

    public getMuzzleX(): number {
        return this.x + 25 + 15;
    }

    public getMuzzleY(): number {
        return this.y + 7;
    }
}
