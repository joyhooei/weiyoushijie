class SoldierCreator enxtends Entity {
    public constructor() {
        super();
    }
    
    public create(soldier: Soldier) {
        application.battle.addSoldier(soldier.relive(100));
    }
}
