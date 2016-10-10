class Bomb3 extends Bomb {
    public constructor() {
        super();
        
        this.addBitmap("bomb3_moving_png", ["south-moving", "east-moving", "west-moving", "north-moving"])
            .addClip("bomb_dying", ["south-fighting", "east-fighting", "west-fighting", "north-fighting"])
            .addBitmap("bomb3_dying_png", "dying");  
    }
}
