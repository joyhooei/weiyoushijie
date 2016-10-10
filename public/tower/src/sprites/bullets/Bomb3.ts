class Bomb3 extends Bomb {
    public constructor() {
        super();
        
        this.addAllBitmaps("bomb3_moving_png", "moving")
            .addAllClips("bomb_fighting", "fighting")
            .addAllBitmaps("bomb3_dying_png", "dying");  
    }

    protected _fighting() {
        this._ticks ++;
        if (this._ticks >= this._fightTicks) {
            this.kill();
        }
    }
}
