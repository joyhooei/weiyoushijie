class Bomb1 extends Bomb {
    public constructor() {
        super();
        
        this.addBitmap("bomb1_moving_png", "east-moving")
            .addClip("bomb_fighting", "east-fighting");
    }
}
