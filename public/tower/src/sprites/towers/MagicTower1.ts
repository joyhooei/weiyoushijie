class MagicTower1 extends MagicTower {
    public constructor() {
        super();
        
        this.addBitmap("magictower1_png");
        
        this._bulletClaz = "Magic1";
    }

    public getMuzzleX(): number {
        return this.x + 30;
    }

    public getMuzzleY(): number {
        return this.y + 15;
    }
}
