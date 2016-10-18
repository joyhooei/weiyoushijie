class MagicTower4 extends MagicTower {
    public constructor() {
        super();
        
        this.addBitmap("magictower4_png");

        this._bulletClaz = "Magic4";
    }

    public getMuzzleX(): number {
        return this.x + 44;
    }

    public getMuzzleY(): number {
        return this.y + 8;
    }
}
