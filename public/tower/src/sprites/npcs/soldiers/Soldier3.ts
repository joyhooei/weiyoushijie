class Soldier3 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier3_east_fighting", "east-fighting")
                .addClip("soldier3_east_moving", "east-moving")
                .addClip("soldier3_guarding", "east-guarding")
                .addClip("soldier3_dying", "east-dying");
    }
}
