class Bomb2 extends Bomb {
    public constructor() {
        super();
        
        this.addBitmap("bomb2_moving_png", ["south-moving", "east-moving", "west-moving", "north-moving"])
            .addClip("bomb_fighting", ["south-fighting", "east-fighting", "west-fighting", "north-fighting"]);   
    }
}
