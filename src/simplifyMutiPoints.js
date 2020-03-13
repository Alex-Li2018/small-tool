// 地图上的点抽稀算法
import mapUtils from './mapUtils';

// 抽稀处理，对密集的点抽稀，保持点的均匀分布。
const simplifyMutiPoints = (function() {
    function simplifyMutiPoints() { 
    };

    /**
     * @params points<array> 待抽稀的数组
     * @params tolerance<Float> 取样临界值
     * @params indicator<string> 关键属性
     */
    simplifyMutiPoints.getProcessPoints = function (points, tolerance, indicator) {
        //小于3个点时不抽稀，因为1个或2个点无法进行抽稀
        if (points.length < 3) return points;
        //抽稀 //保存需要点下标的数组
        const IndexsToReduce = this.reduce(points, tolerance, indicator);
        //返回的点数组
        let resultPoints = [], dropPoints = []; 

        for (let i = 0; i < points.length; i++) {
            if (IndexsToReduce.indexOf(i) < 0) {
                resultPoints.push(points[i]);
            } else {
                dropPoints.push(points[i]);
            }
        }
        return { dropPoints, resultPoints };
    };

    /**
     * @params points<array> 待抽稀的数组
     * @params tolerance<Float> 取样临界值
     * @params indicator<string> 关键属性
     */
    simplifyMutiPoints.reduce = function (points, tolerance, indicator) { 
        //遍历抽稀，删除相同权重的点
        let IndexsToReduce = new Set();
        for (let i = 0; i < points.length; i++) {
            let k = i + 1;
            if (IndexsToReduce.has(i)) { 
                //如果是已删除的点，跳出
                continue;
            }
            let p1 = points[i];
            
            while (k < points.length) {
                let p2 = points[k], ToReduce;
                // 集合中没有这个值的时候才比较
                if (!IndexsToReduce.has(k)) {
                    ToReduce = this.CheckPointEqualInBuffer(p1, p2, tolerance, indicator);
                }
                
                if (ToReduce) {
                    IndexsToReduce.add(k);
                }
                k++;
            }
        }
        return Array.from(IndexsToReduce);
    };

    //判断在抽稀中是否等值（依据缓冲范围以及关键属性）
    simplifyMutiPoints.CheckPointEqualInBuffer = function (point1, point2, buffer, indicator) {
        // 计算亮点之间的距离
        const distance = mapUtils.getDistance(point1, point2);
        let inbuffer = distance <= buffer;
        // console.log(distance, inbuffer, k);
        let iszEqual = true;
        // 权重比较
        if (indicator) {
            iszEqual = point1.properties[indicator] == point2.properties[indicator];
        }
        return inbuffer && iszEqual;
    };

    return simplifyMutiPoints;
})();

export default simplifyMutiPoints;
