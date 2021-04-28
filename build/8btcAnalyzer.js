"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var BtcAnalyzer = /** @class */ (function () {
    function BtcAnalyzer(url, filePath) {
        this.url = url;
        this.filePath = path_1.default.resolve(__dirname, filePath);
    }
    BtcAnalyzer.getInstance = function (url, filePath) {
        if (!BtcAnalyzer.instance) {
            BtcAnalyzer.instance = new BtcAnalyzer(url, filePath);
        }
        return BtcAnalyzer.instance;
    };
    BtcAnalyzer.prototype.analyze = function (html) {
        var res = this.getListInfo(html);
        this.genJsonFile(res);
    };
    BtcAnalyzer.prototype.getListInfo = function (html) {
        var _a;
        var newsList = [];
        var $ = cheerio_1.default.load(html);
        var newslist = $('.article-item');
        newslist.map(function (index, elem) {
            var title = $(elem).find('.article-item__content h6').text();
            var viewNum = parseInt($(elem).find('.article-item__content .bbt-flex>span:last-child').text());
            newsList.push({ title: title, viewNum: viewNum });
        });
        return _a = {},
            _a[new Date().getTime()] = newsList,
            _a;
    };
    BtcAnalyzer.prototype.genJsonFile = function (res) {
        var _this = this;
        if (!fs_1.default.existsSync(this.filePath)) {
            fs_1.default.writeFile(this.filePath, JSON.stringify(__assign({}, res)), 'utf-8', function (err) {
                if (err) {
                    console.log('create file err:', err);
                }
                else {
                    console.log('create file success!');
                }
            });
        }
        else {
            fs_1.default.readFile(this.filePath, 'utf-8', function (err, data) {
                fs_1.default.writeFile(_this.filePath, JSON.stringify(__assign(__assign({}, JSON.parse(data)), res)), 'utf-8', function (err) {
                    if (err) {
                        console.log('push data err:', err);
                    }
                    else {
                        console.log('push data success!');
                    }
                });
            });
        }
    };
    return BtcAnalyzer;
}());
exports.default = BtcAnalyzer;
