class Hogs extends Enemy {
    public constructor() {
        super();
        
        this.addClip("hogs_east_moving", ["east-moving", "east-guarding"])
            .addClip("hogs_north_moving", ["north-moving", "north-guarding"])
            .addClip("hogs_dying", "dying")
            .addClip("hogs_east_fighting", ["east-fighting", "south-fighting","north-fighting"]);    
    }
}
