class MagicTower4 extends MagicTower {
    public constructor() {
        super();
        
        this.addBitmap("magictower4_png");

        this._bulletClaz = "Magic4";
    }

    protected getMuzzleX(): number {
        return this.x + 44;
    }

    protected getMuzzleY(): number {
        return this.y + 8;
    }
}
