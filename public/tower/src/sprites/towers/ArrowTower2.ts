class ArrowTower2 extends ArrowTower {
    public constructor() {
        super();
        
        this.addBitmap("arrowtower2_png");
        
        this._bulletClaz = "Arrow1";
    }

    public getMuzzleX(): number {
        return this.x + 25 + 15;
    }

    public getMuzzleY(): number {
        return this.y + 7;
    }
}
