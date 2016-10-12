class Soldier1 extends Soldier {
    public constructor() {
        super();
        
        this.addClip("soldier1_west_fighting", ["west-fighting", "north-fighting", "south-fighting"])
                .addClip("soldier1_west_moving", ["west-moving", "north-moving", "south-moving", "west-guarding", "north-guarding", "south-guarding"])
                .addAllClips("soldier1_dying", "dying");
    }
}
