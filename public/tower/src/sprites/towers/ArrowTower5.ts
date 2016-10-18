class ArrowTower5 extends ArrowTower {
    public constructor() {
        super();
        
        this.addBitmap("arrowtower5_png");
        
        this._bulletClaz = "Arrow1";
    }

    pubilc getMuzzleX(): number {
        return this.x + 35;
    }

    pubilc getMuzzleY(): number {
        return this.y + 0;
    }
}
