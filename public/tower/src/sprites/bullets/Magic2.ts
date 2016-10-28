class Magic2 extends Magic {
    public constructor() {
        super();
        
        this.addBitmap("magic_moving_png", "east-moving")
            .addClip("magic2_fighting", "east-fighting")
            .addClip("magic2_building", "east-building");
    }
}
