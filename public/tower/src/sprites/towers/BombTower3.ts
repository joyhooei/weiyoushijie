class BombTower3 extends BombTower {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb1";
        
        this.addBitmap("bombtower31_png");
    }

    pubilc getMuzzleX(): number {
        return this.x + 33;
    }

    pubilc getMuzzleY(): number {
        return this.y + 7;
    }
}
