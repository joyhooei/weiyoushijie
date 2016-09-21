class Soldier1 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier1_west_fighting", "west-fighting")
                .addClip("soldier1_west_moving", "west-moving")
                .addClip("soldier1_west_moving", "west-guarding")
                .addClip("soldier1_dying", "dying");
    }
}
