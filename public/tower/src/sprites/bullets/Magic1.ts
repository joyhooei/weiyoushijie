class Magic1 extends Magic {
    public constructor() {
        super();
        
        this.addAllBitmaps("magic_moving_png", "moving")
            .addAllClips("magic1_fighting", "fighting")
            .addAllClips("magic1_building", "building");
    }
}
