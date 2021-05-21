"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var _8btcAnalyzer_1 = __importDefault(require("./utils/8btcAnalyzer"));
var crowller_1 = __importDefault(require("./utils/crowller"));
var util_1 = require("./utils/util");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var router = express_1.Router();
// add if login middleware
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        next();
    }
    else {
        // res.send('请先登陆');
        res.json(util_1.getResData(null, '请先登陆'));
    }
};
router.get('/', function (req, res) {
    // 已经登陆访问首页
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send("\n\t\t\t<a href=\"/getData\">\u722C\u53D6\u6570\u636E</a>\n\t\t\t<a href=\"/logout\">\u9000\u51FA</a>\n\t\t\t");
    }
    else {
        res.send("\n\t\t\t<form method=\"post\" action=\"/login\">\n\t\t\t\t<input type=\"password\" name=\"password\"></input>\n\t\t\t\t<button type=\"submit\">\u767B\u9646</button>\n\t\t\t</form>\n\t\t\t");
    }
});
router.post('/login', function (req, res) {
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
});
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    // res.redirect('/');
    // data 字段返回一个true
    res.json(util_1.getResData(true));
});
// 进入 getData 路由的时候，先走checkLogin 中间件，之后进入下个函数
router.get('/getData', 
// use checkLogin middle
checkLogin, function (req, res) {
    //express.bodyParser() is no longer bundled as part of express.
    // You need to install it separately before loading:
    var btcAnalyzer = _8btcAnalyzer_1.default.getInstance('https://m.8btc.com/');
    new crowller_1.default(btcAnalyzer);
    res.send("\n\t\t\t<p>\n\t\t\tget data success\n\t\t\t</p>\n\t\t\t<a href=\"/showData\">show data</a>\n\t\t\t");
});
router.get('/showData', checkLogin, function (req, res) {
    fs_1.default.stat(path_1.default.resolve(__dirname, '../data/newsInfo.json'), function (err, stat) {
        if (err === null) {
            var dataPath = path_1.default.resolve(__dirname, '../data/newsInfo.json');
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
});
exports.default = router;
