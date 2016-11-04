class Boss1 extends Boss {
    public constructor() {
        super();
        
        this.addClip("enemy4_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy4_south_moving", ["south-moving",'south-guarding'])
            .addClip("enemy4_north_moving", ["north-moving", 'north-guarding'])
            .addClip("enemy4_dying", "east-dying")
            .addClip("enemy4_east_fighting", "east-fighting");
    }
}
