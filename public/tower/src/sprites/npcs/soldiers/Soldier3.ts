class Soldier3 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier3_east_fighting", ["east-fighting", "south-fighting", "north-fighting"])
            .addClip("soldier3_east_moving", ["east-moving", "south-moving", "north-moving", "guarding"])
            .addClip("soldier3_dying", "dying");
    }
}
