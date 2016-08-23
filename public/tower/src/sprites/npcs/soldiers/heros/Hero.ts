class Hero extends Soldier {
    public constructor() {
        super();
        
        application.battle.enableSelect(this);
    }
    
    public select(again:boolean) {
    }
    
    public deselect() {
    }
    
    public erase() {
        super.erase();
        
        let hero = <Hero>application.pool.get(this.getClassName(), {guardX: this._guardX, guardY: this._guardY, idleTicks: 30});
        hero.x = this._guardX;
        hero.y = this._guardY;
        application.battle.addHero(hero);
    }
}
