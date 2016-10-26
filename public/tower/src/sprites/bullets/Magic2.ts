class Magic2 extends Magic {
    public constructor() {
        super();
        
        this.addAllBitmaps("magic_moving_png", "moving")
            .addAllBitmaps("magic2_fighting_png", "fighting")
            .addAllClips("magic2_building", "building");
    }
}
