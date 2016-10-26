class Magic5 extends Magic {
    public constructor() {
        super();
        
        this.addAllBitmaps("magic_moving_png", "moving")
            .addAllBitmaps("magic5_fighting_png", "fighting")
            .addAllClips("magic5_building", "building");
    }
}
