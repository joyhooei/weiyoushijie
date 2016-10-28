class ArrowTower4 extends ArrowTower {
    public constructor() {
        super();
        
        this.addBitmap("arrowtower4_png");
        
        this._bulletClaz = "Arrow4";
    }

    public getMuzzleX(): number {
        return this.x + 35 + 15;
    }

    public getMuzzleY(): number {
        return this.y + 0;
    }
}
