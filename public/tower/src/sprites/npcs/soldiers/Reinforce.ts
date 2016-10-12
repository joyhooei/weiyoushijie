class Reinforce extends Soldier {
    public constructor() {
        super();
        
        this.addClip("reinforce_east_fighting", ["east-fighting", "south-fighting","north-fighting"])
            .addClip("reinforce_east_moving", ["east-moving", "south-moving","north-moving", "east-guarding", "south-guarding", "north-guarding"])
            .addClip("reinforce_dying", "dying");
    }
}
