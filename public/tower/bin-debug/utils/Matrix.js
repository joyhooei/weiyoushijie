var Matrix = (function () {
    function Matrix(data) {
        if (data) {
            this._data = data;
        }
    }
    var d = __define,c=Matrix,p=c.prototype;
    /**
     * 矩阵相乘
     * @param {matrix} m 被乘的矩阵
     */
    p.mul = function (m1) {
        var r = [], s = this._data, m = m1.get(), p = s[0].length; //每次运算相加的次数
        if (m.length != s[0].length) {
            console.error("矩阵不能相乘");
        }
        for (var i = 0; i < s.length; i++) {
            r[i] = [];
            for (var n = 0; n < m[0].length; n++) {
                r[i][n] = 0;
                for (var l = 0; l < p; l++) {
                    r[i][n] += s[i][l] * m[l][n];
                }
            }
        }
        this._data = r;
        return this;
    };
    p.set = function (data) {
        this._data = data;
    };
    p.get = function () {
        return this._data;
    };
    return Matrix;
}());
egret.registerClass(Matrix,'Matrix');
//# sourceMappingURL=Matrix.js.map