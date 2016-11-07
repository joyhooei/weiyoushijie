class Enemy20 extends GroupEnemy {
    public constructor() {
        super();
        
        this.addClip("enemy20_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy20_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy20_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy20_dying", "east-dying")
            .addClip("enemy20_east_fighting", "east-fighting");
    }

    protected _enterGroup(enemy: Enemy) {
        enemy.setMagicArmor(80);
    }

    protected _leaveGroup(enemy: Enemy) {
        let character = application.characters[enemy.getClaz()];
        enemy.setMagicArmor(character.magicArm);
    }
}
