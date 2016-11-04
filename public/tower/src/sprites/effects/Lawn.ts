class Lawn extends Effect {
    public constructor() {
        super();
        
        this.addBitmap("lawn_guarding_png")
            .addClip("lawn_dying", "east-dying");              
    }

    protected _idle() {
        this.guard();
    }

	protected _act(): boolean {
		if (this._state == EntityState.dying) {
			this.erase();
			return false;
		} else {
			return true;
		}
	}
}
