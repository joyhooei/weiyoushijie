class Soldier1 extends Guard {
    public constructor() {
        super();
        
        this.addClip("soldier1_east_fighting", "east-fighting")
                .addClip("soldier1_east_moving", "east-moving")
                .addClip("soldier1_guarding", "east-guarding")
                .addClip("soldier1_dying", "east-dying");
    }
}
