class Bomb1 extends Bomb {
    public constructor() {
        super();
        
        this.addClip("bomb123_fighting", "east-fighting")
            .addClip("bomb123_building", "east-building")
            .addBitmap("bomb1_moving_png", "east-moving");
    }
}
