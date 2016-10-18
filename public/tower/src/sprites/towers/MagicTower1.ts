class MagicTower1 extends MagicTower {
    public constructor() {
        super();
        
        this.addBitmap("magictower1_png");
        
        this._bulletClaz = "Magic1";
    }

    pubilc getMuzzleX(): number {
        return this.x + 36;
    }

    pubilc getMuzzleY(): number {
        return this.y + 0;
    }
}
