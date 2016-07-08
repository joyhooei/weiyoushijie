var CHANNEL_EGRET = "egret";
var CHANNEL_1758 = "1758";
var CHANNEL_7K7K = "";
var Channel = (function () {
    function Channel(name) {
        this.name = name;
        this._deferred = null;
    }
    var d = __define,c=Channel,p=c.prototype;
    Channel.create = function () {
        var cid = egret.getOption("channelId") || egret.getOption("wysj_channel") || "egret";
        if (cid === CHANNEL_1758) {
            console.info("using channel 1758");
            return new Channel1758();
        }
        else {
            console.info("using default channel");
            return new ChannelEgret();
        }
    };
    p.loadjs = function (url) {
        loadfile(url, "js");
    };
    p.promise = function () {
        if (this._deferred) {
            this._deferred.reject("操作超时");
        }
        this._deferred = Q.defer();
        return this._deferred.promise;
    };
    p.resolvedPromise = function () {
        var promise = this.promise();
        this._deferred.resolve();
        return promise;
    };
    p.rejectedPromise = function () {
        var promise = this.promise();
        this._deferred.reject("目前不支持");
        return promise;
    };
    p.resolve = function (data) {
        if (this._deferred) {
            this._deferred.resolve(data);
        }
        this._deferred = null;
    };
    p.reject = function (data) {
        if (this._deferred) {
            this._deferred.reject(data);
        }
        this._deferred = null;
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
    return Channel;
}());
egret.registerClass(Channel,'Channel');
