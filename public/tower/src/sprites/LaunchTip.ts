class LaunchTip extends Tip {
    public constructor() {
        super();

        this.enableSelect(this);
    }

    public select(again:boolean) {
        if (again) {
            this.erase();
        } else {
            Toach.launch("再次点击开始下一波");
        }
    }

    public erase() {
        super.erase();
        
        application.battle.launch();
    }
}
