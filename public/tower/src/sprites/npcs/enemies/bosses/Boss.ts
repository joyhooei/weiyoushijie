class Boss extends Enemy {
    public erase() {
        super.erase();
        
        Utility.delay(function(){
            if (application.battle.getLives() > 0) {
                application.battle.win();
            } else {
                application.battle.lose();
            }
        }, 10);
    }
}
