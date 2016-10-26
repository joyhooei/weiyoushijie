class Magic3 extends Magic {
    public constructor() {
        super();
        
        this.addAllBitmaps("magic_moving_png", "moving")
            .addAllBitmaps("magic3_fighting_png", "fighting")
            .addAllClips("magic3_building", "building");
    }
}
