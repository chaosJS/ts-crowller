"use strict";
var aa = 'name';
var Teacher = /** @class */ (function () {
    function Teacher(info) {
        this.info = info;
    }
    Teacher.prototype.getInfo = function (key) {
        //  T extends keyof Person
        // T 的类型只能是Person的三个key
        return this.info[key];
    };
    return Teacher;
}());
var test = new Teacher({
    name: 'lc',
    age: 18,
    gender: true,
});
var res = test.getInfo('gender');
