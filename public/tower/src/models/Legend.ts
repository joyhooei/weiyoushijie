class Legend {
	public attrs: any;
	
	public skills: Skill[];

	constructor(attrs: any) {
        this.attrs = attrs;
        
        this.skills = [];
    }
    
    public addSkill(skill: any) {
    	this.skills.push(new Skill(skill));
    }
    
    public save() {
        application.dao.save("Legend", this.attrs);
    }
    
    public static getByName(legends: Legend[], name: string): Legend {
    	for(let i = 0; i < legends.length; i++) {
    		if (legends[i].attrs.name == name) {
    			return legends[i];
    		}
    	}
    	
    	return new Legend({level: 1});
    }
}
