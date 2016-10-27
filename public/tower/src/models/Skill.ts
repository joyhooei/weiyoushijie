class Skill {
	public attrs: any;

	constructor(attrs: any) {
        this.attrs = attrs;
    }

    public save() {
        application.dao.save("Skill", this.attrs);
    }

    public static getByClaz(skills: Skill[], claz: string): Skill {
    	for(let i = 0; i < skills.length; i++) {
    		if (skills[i].attrs.claz == claz) {
    			return skills[i];
    		}
    	}
    	
    	return new Skill({level: 1});
    }
}
