class Hero extends Soldier {
    public constructor() {
        super();
        
        application.battle.enableSelect(this);
    }
    
    public select(again:boolean) {
    }
    
    public deselect() {
    }
}
