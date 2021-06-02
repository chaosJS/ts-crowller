"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var decorator_1 = require("./controller/decorator");
require("./controller/loginController");
require("./controller/crowllerController");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['chaos li'],
    maxAge: 24 * 60 * 60 * 1000,
}));
app.use(function (req, res, next) {
    req.myName = 'lc';
    next();
});
app.use(decorator_1.router);
app.listen(7001, function () {
    console.log('server is running');
});
