class Enemy4 extends Enemy {
    public constructor() {
        super();
        
        this.addClip("enemy4_east_moving", ["east-moving", "east-guarding"])
            .addClip("enemy4_south_moving", ["south-moving",'south-guarding'])
            .addClip("enemy4_north_moving", ["north-moving", 'north-guarding'])
            .addClip("enemy4_dying", "east-dying")
            .addClip("enemy4_east_fighting", "east-fighting");
    }
    
    //30%概率免疫近战伤害
    public hitBy(npc: NPC): boolean {
        if (Math.random() < 0.3) {
            this.fight();
            return false;
        } else {
    	    return super.hitBy(npc);
        }
    }
}
