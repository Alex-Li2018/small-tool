// umd适配多种引入方式(类型检测函数)
        (function(root, factory) {
            if (typeof define === 'function' && define.amd) {
                // AMD
                define(['CanvasTool'], factory);
            } else if (typeof exports === 'object' && typeof module === 'object') {
                // Node, CommonJS之类的
                module.exports = factory();
            } else {
                // 浏览器全局变量(root 即 window)
                root.Type = factory();
            }
        }(window, function() {
            const type = {};
            const _toString = Object.prototype.toString

            // 校验数组类型
            type.isArray = Array.isArray;

            // 是否是函数
            type.isFunction =  function isFunction( obj ) {

                // Support: Chrome <=57, Firefox <=52
                // In some browsers, typeof returns "function" for HTML <object> elements
                // (i.e., `typeof document.createElement( "object" ) === "function"`).
                // We don't want to classify *any* DOM node as a function.
                return typeof obj === "function" && typeof obj.nodeType !== "number";
            };

            // 是否是空对象
            type.isEmptyObject = function( obj ) {
                var name;

                for ( name in obj ) {
                    return false;
                }
                return true;
            }
            
            // 是否是JavaScript对象
            type.isPlainObject = function (obj) {
                return _toString.call(obj) === '[object Object]'
            }

            // 是否是正则
            type.isRegExp = function(obj) {
                return _toString.call(obj) === '[object RegExp]'
            }

            // 是否是promise
            type.isPromise = function(val) {
                return (
                    isDef(val) &&
                    typeof val.then === 'function' &&
                    typeof val.catch === 'function'
                )
            }
            
            // 参数是否被定义过
            function isDef(v) {
                return v !== undefined && v !== null
            }

            // 参数是否未被定义过
            function isUndef(v) {
                return v === undefined || v === null
            }
            
            return type;
        }))

        console.log(Type.isArray([1,2,3])) // true
        console.log(Type.isEmptyObject({a: 1})) // false
        console.log(Type.isEmptyObject({})) // true