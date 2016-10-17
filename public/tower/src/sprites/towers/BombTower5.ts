class BombTower5 extends BombTower {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb1";
        
        this.addBitmap("bombtower5_png");
    }

    protected getMuzzleX(): number {
        return this.x + 30;
    }

    protected getMuzzleY(): number {
        return this.y + 7;
    }
}
