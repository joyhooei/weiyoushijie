class MagicTower2 extends MagicTower {
    public constructor() {
        super();
        
        this.addBitmap("magictower2_png");
        
        this._bulletClaz = "Magic2";        
    }

    pubilc getMuzzleX(): number {
        return this.x + 40;
    }

    pubilc getMuzzleY(): number {
        return this.y + 5;
    }
}
