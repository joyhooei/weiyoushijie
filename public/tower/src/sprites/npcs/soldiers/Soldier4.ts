class Soldier4 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier4_east_fighting", "east-fighting")
                .addClip("soldier4_east_moving", "east-moving")
                .addClip("soldier4_guarding", "east-guarding")
                .addClip("soldier4_dying", "east-dying");
    }
}
