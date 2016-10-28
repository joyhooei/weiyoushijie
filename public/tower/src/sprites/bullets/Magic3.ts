class Magic3 extends Magic {
    public constructor() {
        super();
        
        this.addBitmap("magic_moving_png", "east-moving")
            .addClip("magic3_fighting", "east-fighting")
            .addClip("magic3_building", "east-building");
    }
}
