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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var _8btcAnalyzer_1 = __importDefault(require("../utils/8btcAnalyzer"));
var crowller_1 = __importDefault(require("../utils/crowller"));
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var checkLogin = function (req, res, next) {
    console.log('login middleware');
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        next();
    }
    else {
        // res.send('请先登陆');
        res.json(util_1.getResData(null, '请先登陆'));
    }
};
var testMiddleware = function (req, res, next) {
    console.log('test middleware');
    next();
};
var CrowllerController = /** @class */ (function () {
    function CrowllerController() {
    }
    CrowllerController.prototype.getData = function (req, res) {
        //express.bodyParser() is no longer bundled as part of express.
        // You need to install it separately before loading:
        var btcAnalyzer = _8btcAnalyzer_1.default.getInstance('https://m.8btc.com/');
        new crowller_1.default(btcAnalyzer);
        res.json(util_1.getResData(true));
    };
    CrowllerController.prototype.showData = function (req, res) {
        fs_1.default.stat(path_1.default.resolve(__dirname, '../../data/newsInfo.json'), function (err, stat) {
            if (err === null) {
                var dataPath = path_1.default.resolve(__dirname, '../../data/newsInfo.json');
                var result = fs_1.default.readFileSync(dataPath, 'utf-8');
                // res.send(JSON.parse(result));
                res.json(util_1.getResData(JSON.parse(result)));
            }
            else if (err.code === 'ENOENT') {
                // file does not exist
                // res.send('尚未爬取到内容');
                res.json(util_1.getResData(false, '尚未爬取到内容'));
            }
            else {
                // res.send(`unexpect err: ${err.code}`);
                res.json(util_1.getResData(false, "unexpect err: " + err.code));
            }
        });
    };
    __decorate([
        decorator_1.get('/getData'),
        decorator_1.useMiddleware(checkLogin),
        decorator_1.useMiddleware(testMiddleware),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "getData", null);
    __decorate([
        decorator_1.get('/showData'),
        decorator_1.useMiddleware(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "showData", null);
    CrowllerController = __decorate([
        decorator_1.controller('/api')
    ], CrowllerController);
    return CrowllerController;
}());
