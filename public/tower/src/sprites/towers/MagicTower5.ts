class MagicTower5 extends MagicTower {
    public constructor() {
        super();
        
        this.addBitmap("magictower5_png");

        this._bulletClaz = "Magic5";
    }

    pubilc getMuzzleX(): number {
        return this.x + 44;
    }

    pubilc getMuzzleY(): number {
        return this.y + 23;
    }
}
