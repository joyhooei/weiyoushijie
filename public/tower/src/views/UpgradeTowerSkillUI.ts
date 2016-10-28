class UpgradeTowerSkillUI extends AbstractUI{
    private _base: Base;
	private _tower: Tower;

    public imgSell: eui.Image;
    public lblSellPrice: eui.Label;

    public imgUpgrade1: eui.Image;
    public lblUpgradePrice1:eui.Label;

    public imgUpgrade2: eui.Image;
    public lblUpgradePrice2:eui.Label;

    constructor(base: Base) {
        super("upgradeTowerSkillUISkin");
        
        this._base  = base;
		this._tower = base.getTower();
		        
        application.dao.addEventListener("Battle",function(evt: egret.Event) {
            this.refresh();
        },this);
			
		this.imgSell.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this._base.setTower(null);

	        application.hideUI(this);
		}, this);
		
		this.imgUpgrade1.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this._upgradeSkill(1);							
		}, this);
		
		this.imgUpgrade2.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
			this._upgradeSkill(2);				
		}, this);
    }

	private _upgradeSkill(skill: number) {
		if (skill == 3) {
			if (application.battle.getGolds() >= this._tower.getSkillUpgradePrice(skill)) {
				this._tower.upgradeSkill(skill);

				application.hideUI(this);
			} else {
				Toast.launch("需要更多的金币");
			}
		} else {
			Toast.launch("已经是最高级了");
		}
	}

    protected onRefresh() {
        this.lblUpgradePrice1.text = this._tower.getSkillUpgradePrice(1).toString();
        this.lblUpgradePrice2.text = this._tower.getSkillUpgradePrice(2).toString();
        
        let claz = this._tower.getClaz();
        switch(claz) {
            case "Magic4Tower":
                this.imgUpgrade1.source = "";
                this.imgUpgrade2.source = "";
                break;
               
            case "Arrow5Tower":
                this.imgUpgrade1.source = "";
                this.imgUpgrade2.source = "";
                break;
                
            case Bomb4Tower:
                this.imgUpgrade1.source = "";
                this.imgUpgrade2.source = "";
                break;
        }
        
		this.lblSellPrice.text = this._tower.getSellPrice().toString();
    }
}
