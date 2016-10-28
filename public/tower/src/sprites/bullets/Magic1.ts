class Magic1 extends Magic {
    public constructor() {
        super();
        
        this.addBitmap("magic_moving_png", "east-moving")
            .addClip("magic1_fighting", "east-fighting")
            .addClip("magic1_building", "east-building");
    }
}
