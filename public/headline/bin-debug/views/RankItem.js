var RankItem = (function (_super) {
    __extends(RankItem, _super);
    function RankItem(showMe, rank, customer) {
        _super.call(this);
        this.skinName = "resource/custom_skins/rankItemSkin.exml";
        if (showMe) {
            if (rank == 0) {
                //show empty
                this.imgBg.source = "RG_png";
                return;
            }
            else {
                this.lblRank.text = rank.toString();
                if (customer.id == application.customer.id) {
                    this.imgBg.source = "RY_png";
                }
                else {
                    this.imgBg.source = "RG_png";
                }
            }
        }
        else {
            if (rank == 1) {
                this.imgBg.source = "RR_png";
            }
            else if (rank == 2) {
                this.imgBg.source = "RBlue_png";
            }
            else if (rank == 3) {
                this.imgBg.source = "RGreen_png";
            }
            else {
                this.imgBg.source = "RG_png";
                this.lblRank.text = rank.toString();
            }
        }
        this.imgAvatar.source = application.avatarUrl(customer);
        this.lblName.text = customer.name;
        this.lblMetal.text = application.format(customer.metal);
        this.lblGold.text = application.format(customer.gold);
    }
    var d = __define,c=RankItem,p=c.prototype;
    return RankItem;
}(eui.Component));
egret.registerClass(RankItem,'RankItem');
