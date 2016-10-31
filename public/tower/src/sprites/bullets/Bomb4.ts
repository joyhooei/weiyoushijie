class Bomb4 extends Bomb {
    public constructor() {
        super();
        
        this.addClip("bomb4_fighting", "east-fighting")
            .addClip("bomb4_building", "east-building")
            .addBitmap("bomb4_moving_png", "east-moving");
    }
}
