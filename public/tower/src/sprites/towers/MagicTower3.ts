class MagicTower3 extends MagicTower {
    public constructor() {
        super();
        
        this.addBitmap("magictower3_png");
                
        this._bulletClaz = "Magic3";
    }

    protected getMuzzleX(): number {
        return this.x + 44;
    }

    protected getMuzzleY(): number {
        return this.y + 8;
    }
}
