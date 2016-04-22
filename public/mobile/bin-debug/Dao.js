var Dao = (function () {
    function Dao(baseUrl) {
        this._baseUrl = baseUrl;
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
        request.addEventListener(egret.Event.COMPLETE, function (evt) {
            var request = evt.currentTarget;
            console.log("post data : ", request.response);
            if (cb) {
                cb(true, JSON.parse(request.response));
            }
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (evt) {
            if (cb) {
                cb(false, event);
            }
        }, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, function (evt) {
            console.log("post progress : " + Math.floor(100 * evt.bytesLoaded / evt.bytesTotal) + "%");
        }, this);
        request.send(JSON.stringify(data));
    };
    return Dao;
}());
egret.registerClass(Dao,'Dao');
