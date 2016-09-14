class Legend {
	public attrs: any;

	constructor(attrs: any) {
        this.attrs = attrs;
    }
    
    public save() {
        application.dao.save("Legend", this.attrs);
    }
}
