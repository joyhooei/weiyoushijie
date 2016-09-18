class Soldier1 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier1_east_fighting", "east-fighting")
                .addClip("soldier1_east_moving", "east-moving")
                .addClip("soldier1_east_moving", "east-guarding")
                .addClip("soldier1_dying", "dying");
    }
}
