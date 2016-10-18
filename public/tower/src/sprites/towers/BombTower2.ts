class BombTower2 extends BombTower {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb1";
        
        this.addBitmap("bombtower2_png");        
    }

    public getMuzzleX(): number {
        return this.x + 32;
    }

    public getMuzzleY(): number {
        return this.y + 9;
    }
}
