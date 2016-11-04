class Boat extends Effect {
    public constructor() {
        super();
        
        this.addClip("boat_east_moving");
    }
	
	protected _idle() {
		this.guard();
	}
	
	protected _act() {
		return false;
	}
}
