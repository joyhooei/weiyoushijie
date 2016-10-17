class BombTower1 extends BombTower {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb1";
        
        this.addBitmap("bombtower1_png");
    }

    protected getMuzzleX(): number {
        return this.x + 23;
    }

    protected getMuzzleY(): number {
        return this.y + 9;
    }
}
