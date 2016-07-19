class RankItem extends eui.Component {
    private imgBg: eui.Image;
    private lblRank: eui.Label;
	
    private imgAvatar: eui.Image;
    private lblName: eui.Label;
    private lblMetal: eui.Label;
    private lblGold: eui.Label;
    
    public constructor(showMe:boolean, rank:number, customer:any) {
        super();

        this.skinName = "resource/custom_skins/rankItemSkin.exml";

		if (showMe) {
			if (rank == 0) {
				//show empty
                this.imgBg.source = "RG_png";
				
				return;
			} else {
				this.lblRank.text = rank.toString();
				if (customer.id == application.me.attrs.id) {
                    this.imgBg.source = "RY_png";
				} else {
                    this.imgBg.source = "RG_png";
				}
			}
		} else {
			if (rank == 1) {
                this.imgBg.source = "RR_png";
			} else if (rank == 2) {
                this.imgBg.source = "RBlue_png";
			} else if (rank == 3) {
                this.imgBg.source = "RGreen_png";
			} else {
                this.imgBg.source = "RG_png";
                this.lblRank.text = rank.toString();
			}
		}
		
        this.imgAvatar.source = Customer.avatarUrl(customer);
        this.lblName.text  = customer.name;
        this.lblMetal.text = customer.metal;
        this.lblGold.text  = Utility.format(customer.accumulated_gold);
    }
}
