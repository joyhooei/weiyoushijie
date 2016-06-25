class CompensationItem extends eui.Component {
    private imgBg: eui.Image;
    
    private lblContent: eui.Label;
    
    public constructor(showMe:boolean, rank:number, customer:any) {
        super();

        this.skinName = "resource/custom_skins/compensationItem.exml";
    }
}