class Enemy1 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy1_east_moving", "east-moving")
            .addClip("enemy1_south_moving", "south-moving")
            .addClip("enemy1_north_moving", "north-moving")
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_guarding", "east-guarding")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
}
