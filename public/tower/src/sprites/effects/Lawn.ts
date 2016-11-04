class Lawn extends Effect {
    public constructor() {
        super();
        
        this.addBitmap("lawn_guarding").
            .addClip("lawn_dying", "east-dying");              
    }
}
