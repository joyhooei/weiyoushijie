class Enemy11 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy11_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy11_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy11_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy11_dying", "east-dying")
            .addClip("enemy11_east_fighting", "east-fighting");
    }
    
    public erase() {
        this._born("Enemy10", this.x, this.y);
        
        super.erase();
    }    
}
