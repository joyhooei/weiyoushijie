var CHANNEL_1758_IN_EGRET = "10016";
var CHANNEL_HUHUH5 = "huhuh5";
var CHANNEL_51H5 = "51h5";
var TRACK_CATEGORY_PLAYER = "player";
var TRACK_CATEGORY_DIAMOND = "diamond";
var TRACK_CATEGORY_GOLD = "gold";
var TRACK_CATEGORY_ACTIVITY = "activity";
var TRACK_CATEGORY_GUIDE = "guide";
var TRACK_CATEGORY_RESOURCE = "resource";
var TRACK_ACTION_DEC = "dec";
var TRACK_ACTION_INC = "inc";
var TRACK_ACTION_JOIN = "join";
var TRACK_ACTION_ENTER = "enter";
var TRACK_ACTION_LEAVE = "leave";
var TRACK_ACTION_LOAD = "load";
var Channel = (function () {
    function Channel(standalone) {
        this._deferred = null;
        this._standalone = standalone;
    }
    var d = __define,c=Channel,p=c.prototype;
    Channel.create = function () {
        var cid = egret.getOption("wysj_channel") || egret.getOption("channelId") || egret.getOption("egret.runtime.spid") || "egret";
        if (cid === CHANNEL_1758_IN_EGRET) {
            console.info("using channel 1758");
            return new Channel1758(false);
        }
        else if (cid === CHANNEL_HUHUH5) {
            console.info("using channel huhuh5");
            return new ChannelHuHuH5(true);
        }
        else if (cid === CHANNEL_51H5) {
            console.info("using channel huhuh5");
            return new Channel51H5(true);
        }
        else {
            console.info("using default channel");
            return new ChannelEgret(true);
        }
    };
    p.standalone = function () {
        return this._standalone;
    };
    p.require = function (file) {
        return Utility.require(file);
    };
    p.rest = function (channel, method, data) {
        var url = application.baseUrl + "channels/" + method + "?wysj_channel=" + channel;
        console.log("rest " + url + " " + JSON.stringify(data));
        return application.dao.restWithUrl(url, data);
    };
    p.promise = function () {
        this._timer = new egret.Timer(60 * 1000, 1);
        this._timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
            this.reject("操作超时");
        }, this);
        this._timer.start();
        return this._promiseWithoutTimeout();
    };
    p._promiseWithoutTimeout = function () {
        this.reject("");
        this._deferred = Q.defer();
        return this._deferred.promise;
    };
    p.resolvedPromise = function () {
        var promise = this._promiseWithoutTimeout();
        this._deferred.resolve();
        return promise;
    };
    p.rejectedPromise = function () {
        var promise = this._promiseWithoutTimeout();
        this._deferred.reject("目前不支持");
        return promise;
    };
    p.resolve = function (data) {
        if (this._deferred) {
            this._deferred.resolve(data);
        }
        if (this._timer) {
            this._timer.stop();
        }
        this._deferred = null;
    };
    p.reject = function (data) {
        if (this._deferred) {
            this._deferred.reject(data);
        }
        if (this._timer) {
            this._timer.stop();
        }
        this._deferred = null;
    };
    p.openScreen = function (stage) {
        this._loadingUI = new LoadingUI();
        stage.addChild(this._loadingUI);
    };
    p.setOpenScreenProgress = function (progress, total, title) {
        this._loadingUI.setProgress(progress, total);
        if (progress == total) {
            if (this._loadingUI.parent) {
                this._loadingUI.parent.removeChild(this._loadingUI);
            }
        }
    };
    p.loginQuietly = function () {
        var self = this;
        return self.rejectedPromise();
    };
    p.login = function () {
        return this.rejectedPromise();
    };
    p.pay = function (options) {
        return this.rejectedPromise();
    };
    p.share = function (options) {
        return this.rejectedPromise();
    };
    p.attention = function (options) {
        return this.rejectedPromise();
    };
    p.track = function (category, action, opt_label, opt_value) {
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
    return Channel;
}());
egret.registerClass(Channel,'Channel');
//# sourceMappingURL=Channel.js.map