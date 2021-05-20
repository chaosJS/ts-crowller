"use strict";
var Home;
(function (Home) {
    var Header = /** @class */ (function () {
        function Header() {
            var ele = document.createElement('div');
            ele.innerText = 'this is header';
            document.appendChild(ele);
        }
        return Header;
    }());
    var Content = /** @class */ (function () {
        function Content() {
            var ele = document.createElement('div');
            ele.innerText = 'this is content';
            document.appendChild(ele);
        }
        return Content;
    }());
    var Page = /** @class */ (function () {
        function Page() {
            new Header();
            new Content();
        }
        return Page;
    }());
    Home.Page = Page;
    var SubHome;
    (function (SubHome) {
        var test = '1';
    })(SubHome = Home.SubHome || (Home.SubHome = {}));
})(Home || (Home = {}));
// 使用的时候
// new Home.Page();
$(function () {
    console.log('s');
    $('div').html('<p>123</p>');
});
