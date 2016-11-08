class Army {
	public attrs: any;

	constructor(attrs: any) {
        this.attrs = attrs;
    }

    public save(): Q.Promise<any> {
        return application.dao.save("Army", this.attrs);
    }

	public static getHero(armies: Army[]): Army {
		for(let i = 0; i < armies.length; i++) {
			if (armies[i].attrs.role == 1) {
				return armies[i];
			}
		}
		
		return null;
	}
}
