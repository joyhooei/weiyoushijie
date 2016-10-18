class MagicTower3 extends MagicTower {
    public constructor() {
        super();
        
        this.addBitmap("magictower3_png");
                
        this._bulletClaz = "Magic3";
    }

    pubilc getMuzzleX(): number {
        return this.x + 44;
    }

    pubilc getMuzzleY(): number {
        return this.y + 8;
    }
}
