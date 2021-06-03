"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMiddleware = void 0;
require("reflect-metadata");
function useMiddleware(middleware) {
    // return a real deco func
    return function (target, key) {
        // matadata 的key是middleware 值是middleware 存放在target对应的key上，
        // Reflect.defineMetadata('middleware', middleware, target, key);
        // { getData: [Function (anonymous)], showData: [Function (anonymous)] } showData
        // console.log(target, key, 'sss');
        // 可以使用多个middleware
        var middlewares = Reflect.getMetadata('middlewares', target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata('middlewares', middlewares, target, key);
    };
}
exports.useMiddleware = useMiddleware;
