class MagicTower2 extends MagicTower {
    public constructor() {
        super();
        
        this.addBitmap("magictower2_png");
        
        this._bulletClaz = "Magic2";        
    }

    protected getMuzzleX(): number {
        return this.x + 40;
    }

    protected getMuzzleY(): number {
        return this.y + 5;
    }
}
