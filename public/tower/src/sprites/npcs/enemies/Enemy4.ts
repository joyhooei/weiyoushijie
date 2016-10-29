class Enemy4 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy4_east_moving", "east-moving")
            .addClip("enemy4_south_moving", "south-moving")
            .addClip("enemy4_north_moving", "north-moving")
            .addClip("enemy4_dying", "east-dying")
            .addClip("enemy4_guarding", "east-guarding")
            .addClip("enemy4_east_fighting", "east-fighting");
    }
}
