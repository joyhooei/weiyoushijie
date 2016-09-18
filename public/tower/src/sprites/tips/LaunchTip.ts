class LaunchTip extends Tip {
    public constructor() {
        super();

        this.touchEnabled = true;
        
        this.addBitmap("launch_png");
    }

    public select(again:boolean) {
        if (again) {
            application.battle.launch();
            
            this.erase();
        } else {
            Toast.launch("再次点击开始下一波");
        }
    }
    
    protected _dying() {
        super._dying();
        
        this.rotation ++;
    }
}
