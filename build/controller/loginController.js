"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function get(path) {
    return function (target, key, descriptor) {
        // metadataKey: any, metadataValue: any, target: Object, propertyKey: string
        // 定义元数据，自定义数据
        Reflect.defineMetadata('path', path, target, key);
    };
}
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.home = function (req, res) {
        // 已经登陆访问首页
        var isLogin = req.session ? req.session.login : undefined;
        if (isLogin) {
            res.send("\n\t\t\t<a href=\"/getData\">\u722C\u53D6\u6570\u636E</a>\n\t\t\t<a href=\"/logout\">\u9000\u51FA</a>\n\t\t\t");
        }
        else {
            res.send("\n\t\t\t<form method=\"post\" action=\"/login\">\n\t\t\t\t<input type=\"password\" name=\"password\"></input>\n\t\t\t\t<button type=\"submit\">\u767B\u9646</button>\n\t\t\t</form>\n\t\t\t");
        }
    };
    __decorate([
        get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "home", null);
    return LoginController;
}());
