"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.useMiddleware = exports.controller = exports.router = void 0;
var express_1 = require("express");
require("reflect-metadata");
exports.router = express_1.Router();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function controller(target) {
    for (var key in target.prototype) {
        // 获取自定义数据
        // console.log(Reflect.getMetadata('path', target.prototype, key));
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var handler = target.prototype[key];
        // 在总控制器中获得middleware
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        if (path && method && handler) {
            if (middleware) {
                // express 中 router的参数
                exports.router[method](path, middleware, handler);
            }
            else {
                exports.router[method](path, handler);
            }
        }
    }
}
exports.controller = controller;
// export function get(path: string) {
// 	return (target: any, key: string, descriptor: PropertyDescriptor) => {
// 		// metadataKey: any, metadataValue: any, target: Object, propertyKey: string
// 		// 定义元数据，自定义数据
// 		Reflect.defineMetadata('path', path, target, key);
// 		// 定义方法 在controller中获取到
// 		Reflect.defineMetadata('method', 'get', target, key);
// 	};
// }
// export function post(path: string) {
// 	return (target: any, key: string, descriptor: PropertyDescriptor) => {
// 		// metadataKey: any, metadataValue: any, target: Object, propertyKey: string
// 		// 定义元数据，自定义数据
// 		Reflect.defineMetadata('path', path, target, key);
// 		Reflect.defineMetadata('method', 'post', target, key);
// 	};
// }
// factory mode to export method
function genMethods(type) {
    return function (path) {
        return function (target, key, descriptor) {
            // metadataKey: any, metadataValue: any, target: Object, propertyKey: string
            // 定义元数据，自定义数据
            Reflect.defineMetadata('path', path, target, key);
            // 定义方法 在controller中获取到
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
function useMiddleware(middleware) {
    // return a real deco func
    return function (target, key) {
        // matadata 的key是middleware 值是middleware 存放在target对应的key上，
        Reflect.defineMetadata('middleware', middleware, target, key);
        // { getData: [Function (anonymous)], showData: [Function (anonymous)] } showData
        // console.log(target, key, 'sss');
    };
}
exports.useMiddleware = useMiddleware;
exports.get = genMethods('get');
exports.post = genMethods('post');
// export const put = genMethods('put');
