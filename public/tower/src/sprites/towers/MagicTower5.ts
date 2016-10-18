class MagicTower5 extends MagicTower {
    public constructor() {
        super();
        
        this.addBitmap("magictower5_png");

        this._bulletClaz = "Magic5";
    }

    public getMuzzleX(): number {
        return this.x + 44;
    }

    public getMuzzleY(): number {
        return this.y + 23;
    }
}
