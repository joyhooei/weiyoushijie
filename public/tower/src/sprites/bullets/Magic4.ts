class Magic4 extends Magic {
    public constructor() {
        super();
        
        this.addAllBitmaps("magic_moving_png", "moving")
            .addAllBitmaps("magic4_fighting_png", "fighting")
            .addAllClips("magic4_building", "building");
    }
}
