class Magic5 extends Magic {
    public constructor() {
        super();
        
        this.addAllBitmaps("magic5_moving_png", "moving")
            .addAllClips("magic5_fighting", "fighting")
            .addAllClips("magic5_building", "building");
    }
}
