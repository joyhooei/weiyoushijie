class Magic2 extends Magic {
    public constructor() {
        super();
        
        this.addAllBitmaps("magic_moving_png", "moving")
            .addAllClips("magic2_fighting", "fighting")
            .addAllClips("magic2_building", "building");
    }
}
