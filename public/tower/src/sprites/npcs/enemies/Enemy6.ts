class Enemy6 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy1_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy1_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy1_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy1_dying", "east-dying")
            .addClip("enemy1_east_fighting", "east-fighting");
    }
    
    public erase() {
        this._born("Enemy7", this.x, this.y);
        
        super.erase();
    }
}
