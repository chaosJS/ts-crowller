"use strict";
function trainAnimal(
// 参数的联合类型
animal) {
    // 用as 类型断言的方式实现类型保护
    if (animal.fly) {
        animal.sing();
    }
    else {
        animal.bark();
    }
    // 用 in 语法实现类型保护
    if ('sing' in animal) {
        animal.sing();
    }
    else {
        animal.bark();
    }
}
// 也可以使用 typeof 和 instanceof 判断基础类型和对象类型 实现类型保护
// 枚举类型
var Status;
(function (Status) {
    Status[Status["OFFLINE"] = 0] = "OFFLINE";
    Status[Status["ONLINE"] = 1] = "ONLINE";
    Status[Status["DELETED"] = 2] = "DELETED";
    Status[Status["ERROR"] = 3] = "ERROR";
})(Status || (Status = {}));
// Status[0] === OFFLINE
// Status.OFFLINE === 0;
// 等价于
/*
const Status = {
    OFFLINE: 0,
  ONLINE: 1,
  ...
};
*/
var Status1;
(function (Status1) {
    Status1[Status1["OFFLINE"] = 1] = "OFFLINE";
    Status1[Status1["ONLINE"] = 2] = "ONLINE";
    Status1[Status1["DELETED"] = 3] = "DELETED";
    Status1[Status1["ERROR"] = 4] = "ERROR";
    // 下标从1开始
})(Status1 || (Status1 = {}));
