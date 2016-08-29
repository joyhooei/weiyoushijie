class Hero extends Soldier implements SoldierCreator {
    public constructor() {
        super();
        
        this._warriors = [];
    }

    public createSoldier(soldier: Soldier): Soldier {
        let s = soldier.relive(ticks);
        s.x = this.getCenterX();
        s.y = this.getCenterY();
        application.battle.addSoldier(s);

        return s;        
    }
}
