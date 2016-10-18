class ArrowTower3 extends ArrowTower {
    public constructor() {
        super();
        
        this.addBitmap("arrowtower3_png");
        
        this._bulletClaz = "Arrow1";
    }

    public getMuzzleX(): number {
        return this.x + 35;
    }

    public getMuzzleY(): number {
        return this.y + 0;
    }
}
