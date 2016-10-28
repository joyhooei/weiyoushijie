class Bomb3 extends Bomb {
    public constructor() {
        super();
        
        this.addBitmap("bomb3_moving_png", "east-moving")
            .addClip("bomb_fighting", "east-fighting")
            .addBitmap("bomb3_dying_png", "east-dying");  
    }

    protected _fighting() {
        this._ticks ++;
        if (this._ticks >= this._fightingTicks) {
            this.kill();
        }
    }
}
