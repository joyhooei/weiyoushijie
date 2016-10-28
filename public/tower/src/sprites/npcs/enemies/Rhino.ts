class Rhino extends Enemy {
    public constructor() {
        super();
        
        this.addClip("rhino_east_moving", "east-moving")
            .addClip("rhino_south_moving", "south-moving")
            .addClip("rhino_north_moving", "north-moving")
            .addClip("rhino_dying", "east-dying")
            .addClip("rhino_guarding", "east-guarding")
            .addClip("rhino_east_fighting", "east-fighting");
    }
}
