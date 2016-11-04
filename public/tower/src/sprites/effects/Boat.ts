class Boat extends MovableEntity {
    public constructor() {
        super();
        
        this.addClip("boat_east_moving");
    }
    
	protected _arrive() {
        this.guard();
	}    
}
