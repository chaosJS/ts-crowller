"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 类的装饰器
// 装饰器本身是一个函数
function decoFn(targetClass) {
    targetClass.prototype.getName = function () {
        return targetClass.myName;
    };
    targetClass.myName = 'lc';
}
function decoFn1(params) {
    return function (targetClass) {
        targetClass.prototype.getLast = function () {
            return targetClass.myLast;
        };
        targetClass.myLast = 'chaos' + params;
    };
}
// 装饰器语法是实验性质的，需要在tsconfig 中打开
// decoFn的执行时机是在代码编译时发生的（不是TypeScript编译，而是js在执行机中编译阶段），而不是在运行时
var Test = /** @class */ (function () {
    function Test() {
    }
    Test = __decorate([
        decoFn,
        decoFn1('xxx')
    ], Test);
    return Test;
}());
var test = new Test();
console.log(test.getName());
console.log(test.getLast());
function deco(targetClass) {
    // T这个泛型必须是构造函数
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = 'chaos T';
            return _this;
        }
        class_1.prototype.getName = function () {
            return this.name;
        };
        return class_1;
    }(targetClass));
}
var Test1 = /** @class */ (function () {
    function Test1(name) {
        this.name = name;
    }
    Test1 = __decorate([
        deco,
        __metadata("design:paramtypes", [String])
    ], Test1);
    return Test1;
}());
var test1 = new Test1('lc');
console.log(test1.getName()); // 还是需要 as any
function decoT() {
    return function (targetClass) {
        // T这个泛型必须是构造函数
        return /** @class */ (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.name = 'chaos formal';
                return _this;
            }
            class_2.prototype.getName = function () {
                return this.name;
            };
            return class_2;
        }(targetClass));
    };
}
// decoT() 返回一个 装饰器 需要传入一个class参数 返回一个类
var Test2 = decoT()(/** @class */ (function () {
    function class_3(name) {
        this.name = name;
    }
    return class_3;
}()));
var test2 = new Test2('meme');
console.log(test2.getName()); // 还是需要 as any
// 方法装饰器
// 类中的普通方法 target 指向 类的原型对象。 class prototype
// 类中的静态方法 target 指向 类的构造函数
function getNameDeco(target, key, descriptor) {
    console.log(target, '---');
    // 目标函数不能被重写
    descriptor.writable = false;
    descriptor.value = function () {
        return 'change desc value into new func';
    };
}
var TestFn = /** @class */ (function () {
    function TestFn(name) {
        this.name = name;
    }
    TestFn.prototype.getName = function () {
        return this.name;
    };
    __decorate([
        getNameDeco,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TestFn.prototype, "getName", null);
    return TestFn;
}());
var testFn = new TestFn('lc');
console.log(testFn.getName());
// getter setter deco
function visitSetDeco(arget, key, descriptor) {
    // 参数一样
    descriptor.writable = false;
}
// 属性装饰器
function propDeco(target, key) {
    console.log(target, key, 'target,,,,,key');
    var descriptor = {
        writable: false,
    };
    return descriptor;
}
var TestSetter = /** @class */ (function () {
    function TestSetter(name, age) {
        this._name = name;
        this.age = age;
    }
    Object.defineProperty(TestSetter.prototype, "name", {
        get: function () {
            return this._name;
        },
        // @visitSetDeco
        set: function (name) {
            this._name = name + 'set--';
        },
        enumerable: false,
        configurable: true
    });
    return TestSetter;
}());
var testSetter = new TestSetter('lc', 18);
// testSetter.age = 12; // 设置报错
// console.log(testSetter.age);
// 参数装饰器
function paraDeco(target, fnName, paramIndex) {
    // target 原型
    // key 方法名 getInfo
    // paramIndex 第几个参数
}
var ParaTest = /** @class */ (function () {
    function ParaTest() {
    }
    ParaTest.prototype.getInfo = function (name, age) {
        console.log(name, age);
    };
    __decorate([
        __param(0, paraDeco),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number]),
        __metadata("design:returntype", void 0)
    ], ParaTest.prototype, "getInfo", null);
    return ParaTest;
}());
var pTest = new ParaTest();
pTest.getInfo('lc', 18);
// 使用实例
var userInfo = undefined;
function catchErr(msg) {
    return function (target, key, descriptor) {
        // 目标函数的值
        var fn = descriptor.value;
        descriptor.value = function () {
            try {
                fn();
            }
            catch (error) {
                console.log("err: " + msg + "!");
            }
        };
    };
}
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.getName = function () {
        return userInfo.name;
    };
    Person.prototype.getAge = function () {
        return userInfo.age;
    };
    __decorate([
        catchErr('userInfo.name 不存在'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Person.prototype, "getName", null);
    __decorate([
        catchErr('userInfo.age 不存在'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Person.prototype, "getAge", null);
    return Person;
}());
var meInfo = new Person();
meInfo.getName();
meInfo.getAge();
