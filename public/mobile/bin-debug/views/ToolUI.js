var ToolUI = (function (_super) {
    __extends(ToolUI, _super);
    function ToolUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/toolUISkin.exml";
    }
    var d = __define,c=ToolUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        /// 返回逻辑
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
        /// 填充数据
        var dsTools = [
            { icon: "goods01_png", goodsName: "魔法石", comment: "法力加成 +3" },
            { icon: "goods02_png", goodsName: "诅咒娃娃", comment: "咒术加成 +3" },
            { icon: "goods03_png", goodsName: "万圣戒指", comment: "敏捷加成 +3" },
            { icon: "goods04_png", goodsName: "斗篷", comment: "耐力加成 +3" },
            { icon: "goods05_png", goodsName: "鹅毛笔", comment: "精神加成 +3" },
            { icon: "goods06_png", goodsName: "血滴子", comment: "嗜血加成 +3" },
            { icon: "goods07_png", goodsName: "屠龙刀", comment: "力量加成 +5" }
        ];
        this.listTool.dataProvider = new eui.ArrayCollection(dsTools);
        this.listTool.itemRenderer = ToolIRSkin;
    };
    return ToolUI;
}(eui.Component));
egret.registerClass(ToolUI,'ToolUI');
var ToolIRSkin = (function (_super) {
    __extends(ToolIRSkin, _super);
    function ToolIRSkin() {
        _super.call(this);
        this.skinName = "toolIRSkin";
    }
    var d = __define,c=ToolIRSkin,p=c.prototype;
    return ToolIRSkin;
}(eui.ItemRenderer));
egret.registerClass(ToolIRSkin,'ToolIRSkin');
