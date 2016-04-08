class Model {
	public id:string;
	
	public constructor() {
		this.id = "";
	}
	
	public fromJSON(json: string) {
        var jsonObj = JSON.parse(json);
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName]
        }
    }
	
	public toJSON():string{
		return JSON.stringify(this);
	}
}