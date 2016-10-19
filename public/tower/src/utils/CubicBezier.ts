//http://www.html-js.com/article/1180
//http://web.iitd.ac.in/~hegde/cad/lecture/L13_Beziercurve.pdf

class CubicBezier {
    private _m1:Matrix;
    private _m2:Matrix;
    private _m3:Matrix;
    
    public constructor(path:number[][]){
        this._m1 = new Matrix();
        
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

    /*
    *根据已知点获取第i个控制点的坐标
    *param path	已知曲线将经过的坐标点
    *param i	第i个坐标点
    *param a,b	可以自定义的正数
    */
    public getCtrlPoints(path:number[][], i:number, a = 0.25, b = 0.25):number[][]{
        //处理两种极端情形
        if(i < 1){
            var cx1 = path[0][0] + (path[1][0] - path[0][0]) * a;
            var cy1 = path[0][1] + (path[1][1] - path[0][1]) * a;
        }else{
            var cx1 = path[i][0] + (path[i+1][0] - path[i-1][0]) * a;
            var cy1 = path[i][1] + (path[i+1][1] - path[i-1][1]) * a;
        }
        
        if(i > path.length - 3){
            var last = path.length  -1;
            
            var cx2 = path[last].x - (path[last][0] - path[last - 1][0]) * b;
            var cy2 = path[last].y - (path[last][1] - path[last - 1][1]) * b;
        }else{
            var cx2 = path[i+1].x - (path[i+2][0] - path[i][0]) * b;
            var cy2 = path[i+1].y - (path[i+2][1] - path[i][1]) * b;
        }
        
        return [[cx1, cy1], [cx2, cy2]];
    }
}
