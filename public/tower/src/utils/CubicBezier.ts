//http://www.html-js.com/article/1180
//http://web.iitd.ac.in/~hegde/cad/lecture/L13_Beziercurve.pdf

class CubicBezier {
    private _m1:Matrix;
    private _m2:Matrix;
    private _m3:Matrix;
    
    public constructor(path:number[][]){
        this._m1 = new Matrix();
        
        if (path.length == 4) {
            this._m2 = new Matrix([
                    [1,  0,  0, 0],
                    [-3, 3,  0, 0],
                    [3, -6,  3, 0],
                    [-1, 3, -3, 1]
                ]);

            this._m3 = new Matrix([
                [path[0][0], path[0][1]],
                [path[1][0], path[1][1]],
                [path[2][0], path[2][1]],
                [path[3][0], path[3][1]],
                ]);
        } else if (path.length == 5) {
             this._m2 = new Matrix([
                    [1,   0,   0,  0, 0],
                    [-4,  4,   0,  0, 0],
                    [6, -12,   6,  0, 0],
                    [-4, 12, -12,  4, 0],
                    [1,  -4,   6, -4, 1]
                ]);

            this._m3 = new Matrix([
                [path[0][0], path[0][1]],
                [path[1][0], path[1][1]],
                [path[2][0], path[2][1]],
                [path[3][0], path[3][1]],
                [path[4][0], path[4][1]],
                ]);
        }
    }
    
    /**
    * 获取某个时间点计算出来的坐标值,时间线不由此类控制
    */
    public get(t:number): number[]{
        if (this._m2.get().length == 4) {
            this._m1.set([
                [1, t*t, t*t*t, t*t*t*t]
            ]);
        } else {
            this._m1.set([
                [1, t*t, t*t*t, t*t*t*t, t*t*t*t*t]
            ]);
        }
        
        let m = this._m1.mul(this._m2).mul(this._m3);
        
        return [m.get()[0][0], m.get()[0][1]];
    }
}
