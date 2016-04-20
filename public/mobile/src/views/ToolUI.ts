class ToolUI extends eui.Component {
    private btnReturn:eui.Button;

    private listTool:eui.List;
    
    constructor() {
        super();
        this.addEventListener( eui.UIEvent.COMPLETE, this.uiCompHandler, this );
        this.skinName = "resource/custom_skins/toolUISkin.exml";
    }

    private uiCompHandler():void {
        /// 返回逻辑
        this.btnReturn.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=> {
            this.dispatchEventWith( GameEvents.EVT_RETURN );
        }, this );

        /// 填充数据
        var dsTools:Array<Object> = [
            { icon: "goods01_png", goodsName: "魔法石", comment: "法力加成 +3" }
            , { icon: "goods02_png", goodsName: "诅咒娃娃", comment: "咒术加成 +3" }
            , { icon: "goods03_png", goodsName: "万圣戒指", comment: "敏捷加成 +3" }
            , { icon: "goods04_png", goodsName: "斗篷", comment: "耐力加成 +3" }
            , { icon: "goods05_png", goodsName: "鹅毛笔", comment: "精神加成 +3" }
            , { icon: "goods06_png", goodsName: "血滴子", comment: "嗜血加成 +3" }
            , { icon: "goods07_png", goodsName: "屠龙刀", comment: "力量加成 +5" }
        ];
        this.listTool.dataProvider = new eui.ArrayCollection( dsTools );

        this.listTool.itemRenderer = ToolIRSkin;
    }
}

class ToolIRSkin extends eui.ItemRenderer {
    private cb:eui.CheckBox;

    constructor() {
        super();
        this.skinName = "toolIRSkin";
    }
}