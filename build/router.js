"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var _8btcAnalyzer_1 = __importDefault(require("./8btcAnalyzer"));
var crowller_1 = __importDefault(require("./crowller"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var router = express_1.Router();
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
        res.send('已经登陆');
    }
    else {
        if (password == '123' && req.session) {
            // 登陆状态
            req.session.login = true;
            res.send('登陆成功');
        }
        else {
            res.send('password err');
        }
    }
});
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    res.redirect('/');
});
router.get('/getData', function (req, res) {
    //express.bodyParser() is no longer bundled as part of express.
    // You need to install it separately before loading:
    // valid password
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        var btcAnalyzer = _8btcAnalyzer_1.default.getInstance('https://m.8btc.com/', 
        // ../data 固定保存数据目录
        '../data/newsInfo.json');
        new crowller_1.default(btcAnalyzer);
        res.send("\n\t\t\t<p>\n\t\t\tget data success\n\t\t\t</p>\n\t\t\t<a href=\"/showData\">show data</a>\n\t\t\t");
    }
    else {
        res.send(req.myName + " \u767B\u9646\u4E4B\u540E\u624D\u80FD\u722C\u53D6");
    }
});
router.get('/showData', function (req, res) {
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        fs_1.default.stat(path_1.default.resolve(__dirname, '../data/newsInfo.json'), function (err, stat) {
            if (err === null) {
                var dataPath = path_1.default.resolve(__dirname, '../data/newsInfo.json');
                var result = fs_1.default.readFileSync(dataPath, 'utf-8');
                res.send(JSON.parse(result));
            }
            else if (err.code === 'ENOENT') {
                // file does not exist
                res.send('尚未爬取到内容');
            }
            else {
                res.send("unexpect err: " + err.code);
            }
        });
    }
    else {
        res.send("\n\t\t\t<p>\u5C1A\u672A\u767B\u9646\uFF0C\u53BB<a href=\"/\">\u767B\u9646</a></p>\n\t\t");
    }
});
exports.default = router;
