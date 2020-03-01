// 地图的工具类(使用平台,小程序,h5,pc等)
const EARTHRADIUS = 6370996.81;
const mapUtils = (function() {
    const GeoUtils = function () {

    };

    // ------添加静态方法-------

    /**
     * 判断点是否在矩形内
     * @param {Point} point 点对象
     * @param {bounds} bounds 矩形边界对象(由西南点, 东北点两个点构成)
     * @returns {Boolean} 点在矩形内返回true,否则返回false
     */
    GeoUtils.isPointInRect = function(point, bounds) {
        const sw = bounds.sw; //西南脚点
        const ne = bounds.ne; //东北脚点
        console.log(sw, ne);
        return (point.longitude >= sw.longitude && point.longitude <= ne.longitude && point.latitude >= sw.latitude && point.latitude <= ne.latitude);
    };

    /**
     * 判断点是否多边形内
     * @param {Point} point 点对象
     * @param {Polyline} polygon 多边形对象
     * @returns {Boolean} 点在多边形内返回true,否则返回false
     */
    GeoUtils.isPointInPolygon = function(point, polygon) { debugger;
        // 工具函数
        function equals(p1, p2) {
            return p1 && p2 && p1.latitude == p2.latitude && p1.longitude == p2.longitude;
        }
        //首先判断点是否在多边形的外包矩形内，如果在，则进一步判断，否则返回false
        //  const polygonBounds = polygon.getBounds();
        //  if(!this.isPointInRect(point, polygonBounds)) {
        //      return false;
        //  }
 
        const pts = polygon;//获取多边形点
        
        //下述代码来源：http://paulbourke.net/geometry/insidepoly/，进行了部分修改
        //基本思想是利用射线法，计算射线与多边形各边的交点，如果是偶数，则点在多边形外，否则
        //在多边形内。还会考虑一些特殊情况，如点在多边形顶点上，点在多边形边上等特殊情况。
        
        const N = pts.length;
        let boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true
        let intersectCount = 0; //cross points count of x 
        const precision = 2e-10; //浮点类型计算时候与0比较时候的容差
        let p1, p2; //neighbour bound vertices
        let p = point; //测试点
        
        p1 = pts[0];//left vertex        
        for(let i = 1; i <= N; ++i) { //check all rays  
            
            // 判断点是否与多边形的点重合
            if(equals(p, p1)) {
                return boundOrVertex;//p is an vertex
            }
            
            p2 = pts[i % N];//right vertex
            // 点与线不想交,进行下次判断            
            if(p.latitude < Math.min(p1.latitude, p2.latitude) || p.latitude > Math.max(p1.latitude, p2.latitude)) { 
                //ray is outside of our interests                
                p1 = p2; 
                continue;//next ray left point
            }
            
            // 点与线相交
            if(p.latitude > Math.min(p1.latitude, p2.latitude) && p.latitude < Math.max(p1.latitude, p2.latitude)) { 
                //ray is crossing over by the algorithm (common part of) (比较横坐标了)
                if(p.longitude <= Math.max(p1.longitude, p2.longitude)) { 
                    //x is before of ray                    
                    if (p1.latitude == p2.latitude && p.longitude >= Math.min(p1.longitude, p2.longitude)) { 
                        //overlies on a horizontal ray(是否覆盖在水平线上)
                        return boundOrVertex;
                    }
                    
                    if (p1.longitude == p2.longitude) { //ray is vertical (线是否垂直)                       
                        if(p1.longitude == p.longitude) { //overlies on a vertical ray
                            return boundOrVertex;
                        }else{ //before ray
                            ++intersectCount;
                        } 
                    } else { //cross point on the left side                        
                        const xinters = (p.latitude - p1.latitude) * (p2.longitude - p1.longitude) / (p2.latitude - p1.latitude) + p1.longitude;//cross point of longitude                        
                        if(Math.abs(p.longitude - xinters) < precision) { //overlies on a ray
                            return boundOrVertex;
                        }
                        
                        if(p.longitude < xinters) { //before ray
                            ++intersectCount;
                        } 
                    }
                }
            }else{ //special case when ray is crossing through the vertex                
                if(p.latitude == p2.latitude && p.longitude <= p2.longitude) { //p crossing over p2                    
                    const p3 = pts[(i+1) % N]; //next vertex                    
                    if(p.latitude >= Math.min(p1.latitude, p3.latitude) && p.latitude <= Math.max(p1.latitude, p3.latitude)) { //p.latitude lies between p1.latitude & p3.latitude
                        ++intersectCount;
                    }else{
                        intersectCount += 2;
                    }
                }
            }            
            p1 = p2;//next ray left point
        }
    
        if(intersectCount % 2 == 0) { //偶数在多边形外
            return false;
        } else { //奇数在多边形内
            return true;
        }            
    };

    /**
     * 将v值限定在a,b之间，经度使用
     */
    function _getLoop(v, a, b){
        while( v > b){
          v -= b - a
        }
        while(v < a){
          v += b - a
        }
        return v;
    }

    /**
     * 将度转化为弧度
     * @param {degree} Number 度     
     * @returns {Number} 弧度
     */
    GeoUtils.degreeToRad =  function(degree){
        return Math.PI * degree/180;    
    }
    
    /**
     * 将弧度转化为度
     * @param {radian} Number 弧度     
     * @returns {Number} 度
     */
    GeoUtils.radToDegree = function(rad){
        return (180 * rad) / Math.PI;       
    }

    /**
     * 计算两点之间的距离,两点坐标必须为经纬度
     * @param {point1} Point 点对象
     * @param {point2} Point 点对象
     * @returns {Number} 两点之间距离，单位为米
     */
    GeoUtils.getDistance = function(point1, point2){

        point1.longitude = _getLoop(point1.longitude, -180, 180);
        point1.latitude = _getRange(point1.latitude, -74, 74);
        point2.longitude = _getLoop(point2.longitude, -180, 180);
        point2.latitude = _getRange(point2.latitude, -74, 74);
        
        var x1, x2, y1, y2;
        x1 = GeoUtils.degreeToRad(point1.longitude);
        y1 = GeoUtils.degreeToRad(point1.latitude);
        x2 = GeoUtils.degreeToRad(point2.longitude);
        y2 = GeoUtils.degreeToRad(point2.latitude);

        return EARTHRADIUS * Math.acos((Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1)));    
    }
    

    return GeoUtils;
})();// 闭包结束

window.mapUtils = mapUtils;
