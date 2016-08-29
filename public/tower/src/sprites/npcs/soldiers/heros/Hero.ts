class Hero extends Soldier implements SoldierCreator {
    public constructor() {
        super();
    }

    public createSoldier(soldier: Soldier): Soldier {
        let s = soldier.relive(5000);
        s.x = this.getCenterX();
        s.y = this.getCenterY();
        application.battle.addSoldier(s);

        return s;        
    }
}
