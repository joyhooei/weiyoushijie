class Warrior extends Soldier {
    public constructor() {
        super();
        
        this.addClip("warrior_east_fighting", ["east-fighting", "south-fighting","north-fighting", "east-moving", "south-moving","north-moving", "east-guarding", "west-guarding", "south-guarding", "north-guarding"])
            .addClip("warrior_dying", "dying");
    }
}
