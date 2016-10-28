class Magic4 extends Magic {
    public constructor() {
        super();
        
        this.addBitmap("magic_moving_png", "east-moving")
            .addClip("magic4_fighting", "east-fighting")
            .addClip("magic4_building", "east-building");
    }
}
