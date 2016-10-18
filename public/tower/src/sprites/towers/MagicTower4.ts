class MagicTower4 extends MagicTower {
    public constructor() {
        super();
        
        this.addBitmap("magictower4_png");

        this._bulletClaz = "Magic4";
    }

    pubilc getMuzzleX(): number {
        return this.x + 44;
    }

    pubilc getMuzzleY(): number {
        return this.y + 8;
    }
}
