class Hogs extends Enemy {
    public constructor() {
        super();
        
        this.addClip("hogs_east_moving", ["east-moving", "south-moving","north-moving", "guarding"])
            .addClip("hogs_dying", "dying")
            .addClip("hogs_east_fighting", ["east-fighting", "south-fighting","north-fighting"]);    
    }
}
