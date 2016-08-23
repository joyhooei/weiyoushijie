class LaunchTip extends Tip {
    public constructor() {
        super();

        application.battle.enableSelect(this);
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
        super.dying();
        
        this.rotation ++;
    }
    
    public paint() {
        this.paintBitmap("launch_png");
    }
}
