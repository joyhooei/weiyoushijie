class Effect extends Entity {
    public constructor() {
        super();
    }
    
    public initialize(properties: any) {
        super.initialize(properties);
        
        this.move();
    }
}
