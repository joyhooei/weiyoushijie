class LaunchTip extends Entity {
    public constructor() {
        super();
        
        this.kill();
        
        this.enableSelect(this);
    }
    
    protected _dying() {
        if (this._ticks > 1000) {
            this.erase();
            
            application.battle.launch();
        }
    }
    
    public select(again:boolean) {
        this.erase();
        
        application.battle.launch();
    }
}
