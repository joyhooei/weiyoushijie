class ArrowTower5 extends ArrowTower {
    public constructor() {
        super();
        
        this.addBitmap("arrowtower5_png");
        
        this._bulletClaz = "Arrow5";
    }

    public getMuzzleX(): number {
        return this.x + 35 + 15;
    }

    public getMuzzleY(): number {
        return this.y + 0;
    }
}
