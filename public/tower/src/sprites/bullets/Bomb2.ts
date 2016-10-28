class Bomb2 extends Bomb {
    public constructor() {
        super();
        
        this.addBitmap("bomb2_moving_png", "east-moving")
            .addClip("bomb_fighting", "east-fighting"); 
    }
}
