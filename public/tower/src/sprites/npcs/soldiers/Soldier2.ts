class Soldier2 extends Guard {
    public constructor() {
        super();
        
        this.addClip("soldier2_east_fighting", "east-fighting")
                .addClip("soldier2_east_moving", "east-moving")
                .addClip("soldier2_guarding", "east-guarding")
                .addClip("soldier2_dying", "east-dying");
    }
}
