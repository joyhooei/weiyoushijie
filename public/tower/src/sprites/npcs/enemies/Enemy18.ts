class Enemy18 extends GroupEnemy {
    public constructor() {
        super();
        
        this.addClip("enemy18_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy18_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy18_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy18_dying", "east-dying")
            .addClip("enemy18_east_fighting", "east-fighting");
    }

    protected _enterGroup(enemy: Enemy) {
        enemy.setArm(80);
    }

    protected _leaveGroup(enemy: Enemy) {
        let character = application.characters[enemy.getClaz()];
        enemy.setArm(character.arm);
    }
}
