class Boss extends Enemy {
    public kill() {
        super.kill();
        
        application.battle.win();
    }
}
