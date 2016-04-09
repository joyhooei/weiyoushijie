var Dao = (function () {
    function Dao(baseUrl) {
        this._baseUrl = baseUrl;
        this._cb = null;
    }
    var d = __define,c=Dao,p=c.prototype;
    p.fetch = function (model, conditions, filters, cb) {
        this.rest("select/" + model, { conditions: conditions, filters: filters }, cb);
    };
    p.save = function (model, data, cb) {
        if (data.id) {
            this.rest("update/" + model + "/" + data.id, data, cb);
        }
        else {
            this.rest("create/" + model, data, cb);
        }
    };
    p.rest = function (method, data, cb) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        request.open(this._baseUrl + method, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
        this._cb = cb;
        request.send(JSON.stringify(data));
    };
    p.onPostComplete = function (event) {
        var request = event.currentTarget;
        console.log("post data : ", request.response);
        if (this._cb) {
            this._cb(true, JSON.parse(request.response));
        }
    };
    p.onPostIOError = function (event) {
        console.log("post error : " + event);
        if (this._cb) {
            this._cb(false, event);
        }
    };
    p.onPostProgress = function (event) {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    return Dao;
})();
egret.registerClass(Dao,'Dao');
