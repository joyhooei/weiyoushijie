class Enemy29 extends Enemy {
    protected _initialMoveSpeed: number;

    public constructor() {
        super();
        
        this.addClip("enemy29_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy29_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy29_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy29_dying", "east-dying")
            .addClip("enemy29_east_fighting", "east-fighting");
    }
    
    public initialize(properties:any) {
        super.initialize(properties);
        
        this._initialMoveSpeed = this._moveSpeed;
    }    
    
    public damage(d: number): boolean {
        this._moveSpeed = Math.round((1 - this._hp.getHp() / this._hp.getMaxHp()) * 2 * this._initialMoveSpeed);
        
        return super.damage(d);
    }
}
