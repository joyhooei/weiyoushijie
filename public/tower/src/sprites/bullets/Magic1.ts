class Magic1 extends Magic {
    public constructor() {
        super();
        
        this.addBitmap("magic_moving_png", ["south-moving", "east-moving", "west-moving", "north-moving"])
            .addBitmap("magic_fighting", ["south-fighting", "east-fighting", "west-fighting", "north-fighting"]);      
    }
}
