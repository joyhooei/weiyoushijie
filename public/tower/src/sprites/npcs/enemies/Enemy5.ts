class Enemy5 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy5_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy5_south_moving", ["south-moving", "south-guarding"])
            .addClip("enemy5_north_moving", ["north-moving", "north-guarding"])
            .addClip("enemy5_dying", "east-dying")
            .addClip("enemy5_east_fighting", "east-fighting");
    }
    
    //80%概率免疫近战伤害
    public hitBy(npc: NPC): boolean {
        if (Math.random() < 0.8) {
            this.fight();
            return false;
        } else {
    	    return super.hitBy(npc);
        }
    }    
}
