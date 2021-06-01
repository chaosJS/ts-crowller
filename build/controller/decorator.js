"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.controller = exports.router = void 0;
var express_1 = require("express");
require("reflect-metadata");
exports.router = express_1.Router();
function controller(target) {
    for (var key in target.prototype) {
        // 获取自定义数据
        // console.log(Reflect.getMetadata('path', target.prototype, key));
        var path = Reflect.getMetadata('path', target.prototype, key);
        var handler = target.prototype[key];
        if (path) {
            exports.router.get(path, handler);
        }
    }
}
exports.controller = controller;
function get(path) {
    return function (target, key, descriptor) {
        // metadataKey: any, metadataValue: any, target: Object, propertyKey: string
        // 定义元数据，自定义数据
        Reflect.defineMetadata('path', path, target, key);
    };
}
exports.get = get;
