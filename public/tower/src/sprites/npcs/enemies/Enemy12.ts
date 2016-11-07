class Enemy12 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy12_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy12_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy12_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy12_dying", "east-dying")
            .addClip("enemy12_east_fighting", "east-fighting");
    }
}
