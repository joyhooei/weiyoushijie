class BombTower3 extends BombTower {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb1";
        
        this.addBitmap("bombtower31_png");
    }

    public getMuzzleX(): number {
        return this.x + 33;
    }

    public getMuzzleY(): number {
        return this.y + 7;
    }
}
