class BombTower2 extends BombTower {
    public constructor() {
        super();
        
        this._bulletClaz = "Bomb1";
        
        this.addBitmap("bombtower2_png");        
    }

    pubilc getMuzzleX(): number {
        return this.x + 32;
    }

    pubilc getMuzzleY(): number {
        return this.y + 9;
    }
}
