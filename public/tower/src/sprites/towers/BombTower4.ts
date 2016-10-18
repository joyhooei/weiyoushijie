class BombTower4 extends BombTower {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb1";
        
        this.addBitmap("bombtower4_png");
    }

    public getMuzzleX(): number {
        return this.x + 33;
    }

    public getMuzzleY(): number {
        return this.y + 7;
    }
}
