class ArrowTower4 extends ArrowTower {
    public constructor() {
        super();
        
        this.addBitmap("arrowtower4_png");
        
        this._bulletClaz = "Arrow1";
    }

    protected getMuzzleX(): number {
        return this.x + 35;
    }

    protected getMuzzleY(): number {
        return this.y + 0;
    }
}
