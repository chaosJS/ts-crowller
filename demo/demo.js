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
// 函数泛型
function join(first, second) {
    return "" + first + second;
}
// 希望传入的参数类型相同
function genericJoin(first, second) {
    return "" + first + second;
}
genericJoin('1', '2');
// 泛型数组
function map(params) {
    return params;
}
map(['2', '3']);
// 常用的泛型用T作为简写
function fn(params) {
    return params;
}
// 两个泛型
function doubleT(first, second) {
    return "" + first + second;
}
//
doubleT(12, '12'); // 不写尖括号ts会自动推断类型
doubleT('1', 23);
// 类中的泛型
var DataMana = /** @class */ (function () {
    // 此处定义一个类型未知的泛型T
    function DataMana(data) {
        this.data = data;
    }
    DataMana.prototype.getItem = function (index) {
        return this.data[index];
    };
    return DataMana;
}());
var data = new DataMana(['s', 1, true]);
data.getItem(0);
var DataMana1 = /** @class */ (function () {
    // T extends Item 说明 这个泛型必须有Item里面所有属性
    function DataMana1(data) {
        this.data = data;
    }
    DataMana1.prototype.getItem = function (index) {
        return this.data[index].name;
    };
    return DataMana1;
}());
var data1 = new DataMana1([{ name: 'lc' }]);
var data2 = new DataMana1([{ name: 'lc' }]);
data1.getItem(0);
// 泛型作为一个具体的类型注解
function hello(params) {
    return params;
}
var func = hello;
