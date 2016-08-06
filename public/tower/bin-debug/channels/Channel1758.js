window['onShareTimeline'] = function () {
    console.log('onShareTimeline');
    application.channel.resolve();
};
var Channel1758 = (function (_super) {
    __extends(Channel1758, _super);
    function Channel1758(standalone) {
        _super.call(this, standalone);
        this.url = "http://wx.1758.com/static/common/js/hlmy1758.js";
    }
    var d = __define,c=Channel1758,p=c.prototype;
    p.share = function (options) {
        var self = this;
        self.require(self.url).then(function () {
            hlmy.setShareInfo();
        });
        return self.promise();
    };
    return Channel1758;
}(ChannelEgret));
egret.registerClass(Channel1758,'Channel1758');
//# sourceMappingURL=Channel1758.js.map