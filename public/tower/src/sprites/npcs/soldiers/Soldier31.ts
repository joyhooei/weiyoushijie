class Soldier31 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier31_east_fighting", "east-fighting")
                .addClip("soldier31_east_moving", "east-moving")
                .addClip("soldier31_east_moving", "east-guarding")
                .addClip("soldier31_dying", "dying");
    }
}
