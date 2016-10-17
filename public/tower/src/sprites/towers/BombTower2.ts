class BombTower2 extends BombTower {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb1";
        
        this.addBitmap("bombtower2_png");        
    }

    protected getMuzzleX(): number {
        return this.x + 32;
    }

    protected getMuzzleY(): number {
        return this.y + 9;
    }
}
