class RankItem extends eui.Component {
	private imgBg: eui.Label;
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
				
				return;
			} else {
				lblRank.text = rank.toString();
				if (customer.id == application.customer.id) {
					imgBg.source = "PYellow_png";
				} else {
					imgBg.source = "RG_png";
				}
			}
		} else {
			if (rank == 1) {
				imgBg.source = "RR_png";
			} else if (rank == 2) {
				imgBg.source = "RBlue_png";
			} else if (rank == 3) {
				imgBg.source = "RGreen_png";
			} else {
				imgBg.source = "RG_png";
				lblRank.text = rank.toString();
			}
		}
		
		imgAvatar.source = customer.avatar;
		lblName.text = customer.name;
		lblMetal = application.format(customer.metal);
		lblGold = application.format(customer.gold);
    }
}