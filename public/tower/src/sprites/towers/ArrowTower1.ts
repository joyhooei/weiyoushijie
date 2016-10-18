class ArrowTower1 extends ArrowTower {
    public constructor() {
        super();
        
        this.addBitmap("arrowtower1_png");
        
        this._bulletClaz = "Arrow1";
    }

    public getMuzzleX(): number {
        return this.x + 25;
    }

    public getMuzzleY(): number {
        return this.y + 7;
    }
}
