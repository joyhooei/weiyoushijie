class Enemy21 extends GroupEnemy {
    public constructor() {
        super();
        
        this.addClip("enemy21_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy21_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy21_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy21_dying", "east-dying")
            .addClip("enemy21_east_fighting", "east-fighting");
    }

    protected _enterGroup(enemy: Enemy) {
    }

    protected _leaveGroup(enemy: Enemy) {
        if (!enemy.active()) {
            this._born("Enemy22", enemy.getCenterX(), enemy.getCenterY());
        }
    }
}
