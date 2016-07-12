var Channel51H5 = (function (_super) {
    __extends(Channel51H5, _super);
    function Channel51H5(standalone) {
        _super.call(this, standalone);
    }
    var d = __define,c=Channel51H5,p=c.prototype;
    p.login = function () {
        var self = this;
        return self.promise();
    };
    p.pay = function (options) {
        var self = this;
        return self.promise();
    };
    p.share = function (options) {
        var self = this;
        return self.promise();
    };
    p.attention = function (options) {
        var self = this;
        return self.promise();
    };
    p.track = function (category, action, opt_label, opt_value) {
        _super.prototype.track.call(this, category, action, opt_label, opt_value);
        switch (category) {
            case TRACK_CATEGORY_PLAYER:
                if (action == TRACK_ACTION_ENTER) {
                }
                else {
                }
                return;
            case TRACK_CATEGORY_DIAMOND:
                if (action == TRACK_ACTION_INC) {
                }
                else {
                }
                return;
            case TRACK_CATEGORY_GOLD:
                if (action == TRACK_ACTION_INC) {
                }
                else {
                }
                return;
            case TRACK_CATEGORY_ACTIVITY:
                return;
            case TRACK_CATEGORY_GUIDE:
                return;
            case TRACK_CATEGORY_RESOURCE:
                return;
        }
    };
    return Channel51H5;
}(Channel));
egret.registerClass(Channel51H5,'Channel51H5');
