class Soldier4 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier4_east_fighting", ["east-fighting", "south-fighting", "north-fighting"])
            .addClip("soldier4_east_moving", ["east-moving", "south-moving", "north-moving", "guarding"])
            .addClip("soldier4_dying", "dying");
    }
}
