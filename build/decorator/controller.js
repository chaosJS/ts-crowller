"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var router_1 = __importDefault(require("../router"));
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    // put = 'put'
})(Methods || (Methods = {}));
function controller(root) {
    return function (target) {
        for (var key in target.prototype) {
            // 获取自定义数据
            // console.log(Reflect.getMetadata('path', target.prototype, key));
            var path = Reflect.getMetadata('path', target.prototype, key);
            var method = Reflect.getMetadata('method', target.prototype, key);
            var handler = target.prototype[key];
            // 在总控制器中获得middleware
            var middlewares = Reflect.getMetadata('middlewares', target.prototype, key);
            if (path && method && handler) {
                var fullPath = root === '/' ? path : "" + root + path;
                if (middlewares && middlewares.length) {
                    // express 中 router的参数
                    router_1.default[method].apply(router_1.default, __spreadArray(__spreadArray([fullPath], middlewares), [handler]));
                }
                else {
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
