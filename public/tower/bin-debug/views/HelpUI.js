var HelpUI = (function (_super) {
    __extends(HelpUI, _super);
    function HelpUI(content) {
        var _this = this;
        _super.call(this);
        this.skinName = "resource/custom_skins/helpUISkin.exml";
        this.lblContent.text = content;
        this.lblVersion.text = application.version;
        this.imgReport.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
            application.showUI(new ReportUI());
        }, this);
        this.imgBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            application.hideUI(_this);
        }, this);
    }
    var d = __define,c=HelpUI,p=c.prototype;
    HelpUI.showAuctionHelp = function () {
        var content = "1： 拍卖每天中午12点结束。\n";
        content += "2： 前10名将获得钻石和勋章奖励，其余玩家的拍卖金币自动返还。\n";
        content += "3： 拍卖期间，系统显示截至上个小时的最高出价，为新出价的玩家提供参考。\n";
        content += "4： 玩家在拍卖结束前可以反复加价，每次加价最高为当前拥有的所有金币。\n";
        content += "5： 每天首次参加拍卖可以在礼物页面中领取100钻石奖励。（每天12:00刷新）\n";
        content += "－－－－－拍卖奖励 －－－－－\n";
        content += "第1名 2000钻，1枚勋章\n";
        content += "第2名 1500钻，500勋章碎片\n";
        content += "第3名 1200钻，400勋章碎片\n";
        content += "第4名 1000钻，300勋章碎片\n";
        content += "第5-10名 1000钻，200勋章碎片\n";
        application.showUI(new HelpUI(content));
    };
    HelpUI.showMainHelp = function () {
        var content = "玩法\n";
        content += "1. 点击中间舞者可产生金币，金币用来升级运营项目，而运营项目随等级提高从而产生更多的金币。\n";
        content += "2. 金币可以用来参加头条拍卖，每天最高出价者会成为头条，获得头条殊荣，勋章和钻石奖励。\n";
        content += "3. 道具可以帮助玩家快速获得大量金币和永久提高运营项目的每秒产量。\n";
        content += "4. 排行榜会按照勋章的个数排名，勋章数量一致时则按照金币的总量排名。\n";
        var blankWidth = Math.round(egret.sys.measureText(" ", 'Arial', 24, false, false));
        var maxWidth = Math.round(egret.sys.measureText("276个0          zz", 'Arial', 24, false, false));
        var lines = [];
        lines.push("金币单位");
        for (var i = 0; i < Utility.units.length; i++) {
            var line = ((i + 1) * 3).toString() + "个0";
            var blanks = Math.round((maxWidth - egret.sys.measureText(line + Utility.units[i], 'Arial', 24, false, false)) / blankWidth);
            for (var j = 0; j < blanks; j++) {
                line += " ";
            }
            lines.push(line + Utility.units[i]);
        }
        var leftBlanks = Math.floor((380 - maxWidth) / (blankWidth * 2));
        var leftBlank = "";
        for (var j = 0; j < leftBlanks; j++) {
            leftBlank += " ";
        }
        for (var i = 0; i < lines.length; i++) {
            content += leftBlank + lines[i] + "\n";
        }
        application.showUI(new HelpUI(content));
    };
    return HelpUI;
}(eui.Component));
egret.registerClass(HelpUI,'HelpUI');
//# sourceMappingURL=HelpUI.js.map