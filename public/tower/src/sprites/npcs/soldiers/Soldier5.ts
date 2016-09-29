class Soldier5 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier5_east_fighting", ["east-fighting", "south-fighting", "north-fighting"])
            .addClip("soldier5_east_moving", ["east-moving", "south-moving", "north-moving", "guarding"])
            .addClip("soldier5_dying", "dying");
    }
}
