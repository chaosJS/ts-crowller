"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    // put = 'put'
})(Methods || (Methods = {}));
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
exports.get = genMethods(Methods.get);
exports.post = genMethods(Methods.post);
// export const put = genMethods(Methods.put);
