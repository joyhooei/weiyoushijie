class Hero extends Soldier implements {
    public constructor() {
        super();
        
        this._warriors = [];
    }
    
    public addWarrior(warrior: Soldier) {
        warrior.setCreator(this);
    }
    
    public createSoldier(soldier: Soldier): Soldier {
        let s = soldier.relive(ticks);
        s.x = this.getCenterX();
        s.y = this.getCenterY();
        application.battle.addSoldier(s);

        return s;        
    }
}
