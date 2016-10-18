class BombTower5 extends BombTower {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb1";
        
        this.addBitmap("bombtower5_png");
    }

    pubilc getMuzzleX(): number {
        return this.x + 30;
    }

    pubilc getMuzzleY(): number {
        return this.y + 7;
    }
}
