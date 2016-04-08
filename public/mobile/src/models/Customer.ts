/**
 *
 * @author 
 *
 */
class Customer extends Model {
	//姓名
	public name:string;
	
	//头像
	public media_id:string;
	
	//拥有的金币
	public gold:number;

	//拥有的钻石，可以用来购买道具，初始登陆时有100颗
	public diamond:number;
	
	//拥有的奖章，根据它在排行榜中排序
	public metal:number;
	
	//秒产，根据当前所有的项目和道具计算
	public output:number;
	
	public constructor() {
		this.name = "";
		this.media_id = "";
		this.gold = 0;
		this.diamond = 100;
		this.metal = 0;
		this.output = 1;
	}
}
