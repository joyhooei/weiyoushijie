//http://www.html-js.com/article/1180

class CubicBezier {
    private _m1:Matrix;
    private _m2:Matrix;
    private _m3:Matrix;
    
    public constructor(x0:number, y0:number, x1:number, y1:number, x2:number, y2:number, x3:number, y3:number){
        this._m1 = new Matrix();
        
        this._m2 = new Matrix([
                [1,0,0,0],
                [-3,3,0,0],
                [3,-6,3,0],
                [-1,3,-3,1]
            ]);
    
        this._m3 = new Matrix([
            [x0, y0],
            [x1, y1],
            [x2, y2],
            [x3, y3],
            ]);
    }
    
    /**
    * 获取某个时间点计算出来的坐标值,时间线不由此类控制
    */
    public get(t:number): number[]{
        this._m1.set([
            [1, t*t, t*t*t, t*t*t*t]
        ]);
        
        let m = this._m1.mul(this._m2).mul(this._m3);
        
        return [m.get()[0][0], m.get()[0][1]];
    }
}
