class Enemy19 extends GroupEnemy {
    protected _cureTicks: number;

    public constructor() {
        super();
        
        this.addClip("enemy19_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy19_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy19_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy19_dying", "east-dying")
            .addClip("enemy19_east_fighting", "east-fighting");
    }

    public initialize(properties:any) {
        super.initialize(properties);
        
        this._cureTicks = application.frameRate;
    }
     
    public update(): boolean {
        this._cureTicks --;
        if (this._cureTicks <= 0) {
            for(let i = 0; i < this._group.length; i++) {
                this._group[i].addMaxHp(20);
            }
            
            this._cureTicks = application.frameRate;
        }
        
        return super.update();
    }

    protected _enterGroup(enemy: Enemy) {
    }

    protected _leaveGroup(enemy: Enemy) {
    }
}
