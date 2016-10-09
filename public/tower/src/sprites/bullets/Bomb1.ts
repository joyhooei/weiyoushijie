class Bomb1 extends Bomb {
    public constructor() {
        super();
        
        this.addBitmap("bomb1_moving_png", ["south-moving", "east-moving", "west-moving", "north-moving"])
            .addClip("bomb_fighting", ["south-fighting", "east-fighting", "west-fighting", "north-fighting"]);      
    }
}
