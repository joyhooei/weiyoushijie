class Skill {
	public attrs: any;

	constructor(attrs: any) {
        this.attrs = attrs;
    }

    public save() {
        application.dao.save("Skill", this.attrs);
    }

    public static get(skills: Skill[], claz: string, skill: number): Skill {
    	for(let i = 0; i < skills.length; i++) {
    		if (skills[i].attrs.claz == claz && skills[i].attrs.skill == skill) {
    			return skills[i];
    		}
    	}
    	
    	return new Skill({customer_id: application.me.attrs.id, claz: claz, skill: skill, level: 1});
    }
}
