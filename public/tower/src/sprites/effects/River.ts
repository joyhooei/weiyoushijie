class River extends Entity {
    public constructor() {
        super();
        
        this._displays.addClip("river_east_moving", "east-moving");
    }
    
    public initialize(properties: any) {
        super.initialize(properties);
        
        this.move();
    }
}
