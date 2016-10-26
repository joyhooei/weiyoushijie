class Magic3 extends Magic {
    public constructor() {
        super();
        
        this.addAllBitmaps("magic_moving_png", "moving")
            .addAllClips("magic3_fighting", "fighting")
            .addAllClips("magic3_building", "building");
    }
}
