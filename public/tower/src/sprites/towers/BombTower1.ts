class BombTower1 extends BombTower {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb1";
        
        this.addBitmap("bombtower1_png");
    }

    public getMuzzleX(): number {
        return this.x + 23;
    }

    public getMuzzleY(): number {
        return this.y + 9;
    }
}
