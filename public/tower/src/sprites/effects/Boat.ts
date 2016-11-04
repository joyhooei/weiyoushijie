class Boat extends Entity {
    public constructor() {
        super();
        
        this.addClip("boat_east_moving");
    }
	
	protected _idle() {
		this.move();
	}
	
	protected _act() {
		return false;
	}
}
