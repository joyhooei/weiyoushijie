class Cock extends Entity {
    public constructor() {
        super();
        
        this._displays.addClip("cock_east_moving", "east-moving");
    }
    
    public initialize(properties: any) {
        super.initialize(properties);
        
        this.move();
    }
}
