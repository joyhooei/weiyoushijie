//野猪
class Enemy14 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy14_dying", "east-dying")
            .addClip("enemy14_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy14_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy14_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy14_east_fighting", "east-fighting");
    }
}
