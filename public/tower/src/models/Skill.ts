class Skill {
	public attrs: any;

	constructor(attrs: any) {
        this.attrs = attrs;
    }

    public save(): Q.Promise<any> {
        return application.dao.save("Skill", this.attrs);
    }

	public static get(skills: Skill[], claz:string, skill:number):Skill {
		for(let i = 0; i < skills.length; i++) {
			if (skills[i].attrs.claz == claz && skills[i].attrs.skill == skill) {
				return skills[i];
			}
		}
		
		return null;
	}
}
