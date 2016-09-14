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
}
