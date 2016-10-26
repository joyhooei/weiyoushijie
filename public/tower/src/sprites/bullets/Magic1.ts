class Magic1 extends Magic {
    public constructor() {
        super();
        
        this.addAllBitmaps("magic_moving_png", "moving")
            .addAllBitmaps("magic1_fighting_png", "fighting")
            .addAllClips("magic1_building", "building");
    }
}
