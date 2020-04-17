// 实现formate对象作为实例化日期数据的__proto__
let formatDate = {

     //私有方法: 转换整数
     toInt() {
         return parseInt(this.valueOf())
     },

     //私有方法: 更改日期格式
     toDate() {
     	 // this.valueOf()获取的是当前对象的字面量的值
         let dateStr = this.valueOf()

         if(dateStr instanceof Date) return dateStr

         if(!isNaN(dateStr) || /^\d+$/.test(dateStr)) {
             return new Date(this.toInt())
         }

         dateStr = (dateStr || "")
             .trim()
             .replace(/\.\d+/,"")
             .replace(/-/,"/")
             .replace(/-/,"/")
             .replace(/(\d)T(\d)/,"$1 $2")
             .replace(/Z/,'UTC')
             .replace(/([\+\-]\d\d)\:?(\d\d)/,'$1$2')

         return new Date(dateStr)
     },

     //格式化日期为指定格式
     formatDate(fmt) {
         let date = this.toDate(this.valueOf())

         if(!date) return
         const o = {
             'M+': date.getMonth() + 1, //月
             'd+': date.getDate(), //日
             'h+': date.getHours(), //时
             'm+': date.getMinutes(), //分
             's+': date.getSeconds(), //秒
             'q+': Math.floor((date.getMonth() + 3) / 3), //季度
             'S': date.getMilliseconds() //毫秒
         } 

         if(/(y+)/.test(fmt)) {
             fmt = fmt.replace(
                 RegExp.$1,
                 (date.getFullYear() + "").substr(4 - RegExp.$1.length)
             )
         }

         Object.keys(o).forEach(k => {
             if(new RegExp(`(${k})`).test(fmt)) {
                 fmt = fmt.replace(
                     RegExp.$1,
                     RegExp.$1.length == 1 ? o[k] 
                         : ('00' + o[k]).substr(('' + o[k]).length)
                 )
             }
         })

         return fmt
     },
     
     // 计算星期的函数
     getSunday(lang = 'en') {
         const weekEnArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
             weekChArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
         // 中文星期
         if (lang === 'ch') {
             return weekChArr[new Date(this.valueOf()).getDay()];
         } else {
             return weekEnArr[new Date(this.valueOf()).getDay()];
         }
     },

     // 获取当天的日期信息 年月日 星期
     getTodayDate(fmt, lang = 'en') {
         return `${this.formatDate(fmt)} ${this.getSunday(new Date().getTime(),lang)}`;
     }
 }
 
 function enhanceDate (data, formatDate) {
     
     // 对特定数据处理
     var dateProto = Date.prototype
     var dateMethods = Object.create(dateProto)
     
     // 给Date
     for(let key in formatDate) {
         def(dateMethods, key, formatDate[key]);
     }

     // 改变实例化对象的__proto__
     protoAugment(data, dateMethods)

     return data
     /**
      * Augment a target Object or Array by intercepting
      * the prototype chain using __proto__
      */
     function protoAugment (target, src) {
         /* eslint-disable no-proto */
         target.__proto__ = src;
         /* eslint-enable no-proto */
     }
     /**
      * Define a property.
      */
     function def (obj, key, val, enumerable) {
         Object.defineProperty(obj, key, {
             value: val,
             enumerable: !!enumerable,
             writable: true,
             configurable: true
         });
     }
 }

 let d1 = enhanceDate(new Date(), formatDate);
 let d2 = enhanceDate(new Date("2019-10-1 12:00:30"), formatDate);
 console.dir(d1)
 console.log(d1.getSunday())
 console.log(d1.getTodayDate('yyyy-MM-dd hh:mm:ss'))
 console.log(d2.formatDate('yyyy-MM-dd hh:mm:ss'))
