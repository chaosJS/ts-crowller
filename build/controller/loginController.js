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
var decorator_1 = require("./decorator");
var util_1 = require("../utils/util");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.login = function (req, res) {
        var password = req.body.password;
        var isLogin = req.session ? req.session.login : undefined;
        if (isLogin) {
            // res.send('已经登陆');
            res.json(util_1.getResData(false, '已经登陆'));
        }
        else {
            if (password == '123' && req.session) {
                // 登陆状态
                req.session.login = true;
                // res.send('登陆成功');
                res.json(util_1.getResData(true));
            }
            else {
                // res.send('password err');
                res.json(util_1.getResData(false, '密码错误，登陆失败'));
            }
        }
    };
    LoginController.prototype.logout = function (req, res) {
        if (req.session) {
            req.session.login = undefined;
        }
        // res.redirect('/');
        // data 字段返回一个true
        res.json(util_1.getResData(true));
    };
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
        decorator_1.post('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    __decorate([
        decorator_1.get('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    __decorate([
        decorator_1.get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "home", null);
    LoginController = __decorate([
        decorator_1.controller
    ], LoginController);
    return LoginController;
}());
