class Enemy3 extends ShootEnemy {
    public constructor() {
        super();
        
        this.addClip("enemy3_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy3_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy3_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy3_dying", "east-dying")
            .addClip("enemy3_east_fighting", "east-fighting");
    }
}
