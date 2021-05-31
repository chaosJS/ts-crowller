// 类的装饰器
// 装饰器本身是一个函数
function decoFn(targetClass: any) {
	targetClass.prototype.getName = () => {
		return targetClass.myName;
	};
	targetClass.myName = 'lc';
}

function decoFn1(params: string) {
	return function (targetClass: any) {
		targetClass.prototype.getLast = () => {
			return targetClass.myLast;
		};
		targetClass.myLast = 'chaos' + params;
	};
}

// 装饰器语法是实验性质的，需要在tsconfig 中打开
// decoFn的执行时机是在代码编译时发生的（不是TypeScript编译，而是js在执行机中编译阶段），而不是在运行时
@decoFn
@decoFn1('xxx')
class Test {}
const test = new Test();
console.log((test as any).getName());
console.log((test as any).getLast());

function deco<T extends new (...args: any[]) => any>(targetClass: T) {
	// T这个泛型必须是构造函数
	return class extends targetClass {
		name = 'chaos T';
		getName() {
			return this.name;
		}
	};
}
@deco
class Test1 {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
}
const test1 = new Test1('lc');
console.log((test1 as any).getName()); // 还是需要 as any

function decoT() {
	return function <T extends new (...args: any[]) => any>(targetClass: T) {
		// T这个泛型必须是构造函数
		return class extends targetClass {
			name = 'chaos formal';
			getName() {
				return this.name;
			}
		};
	};
}

// decoT() 返回一个 装饰器 需要传入一个class参数 返回一个类
const Test2 = decoT()(
	class {
		name: string;
		constructor(name: string) {
			this.name = name;
		}
	}
);
const test2 = new Test2('meme');
console.log(test2.getName()); // 还是需要 as any

// 方法装饰器

// 类中的普通方法 target 指向 类的原型对象。 class prototype
// 类中的静态方法 target 指向 类的构造函数
function getNameDeco(target: any, key: string, descriptor: PropertyDescriptor) {
	console.log(target, '---');

	// 目标函数不能被重写
	descriptor.writable = false;

	descriptor.value = () => {
		return 'change desc value into new func';
	};
}
class TestFn {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
	@getNameDeco
	getName() {
		return this.name;
	}
}

const testFn = new TestFn('lc');
console.log(testFn.getName());

// getter setter deco
function visitSetDeco(arget: any, key: string, descriptor: PropertyDescriptor) {
	// 参数一样
	descriptor.writable = false;
}

// 属性装饰器
function propDeco(target: any, key: string): any {
	console.log(target, key, 'target,,,,,key');
	const descriptor: PropertyDescriptor = {
		writable: false,
	};
	return descriptor;
}
class TestSetter {
	private _name: string;
	// @propDeco
	age: number;
	constructor(name: string, age: number) {
		this._name = name;
		this.age = age;
	}
	get name() {
		return this._name;
	}

	// @visitSetDeco
	set name(name: string) {
		this._name = name + 'set--';
	}
}
const testSetter = new TestSetter('lc', 18);
// testSetter.age = 12; // 设置报错
// console.log(testSetter.age);

// 参数装饰器
function paraDeco(target: any, fnName: string, paramIndex: number) {
	// target 原型
	// key 方法名 getInfo
	// paramIndex 第几个参数
}
class ParaTest {
	getInfo(
		@paraDeco
		name: string,
		age: number
	) {
		console.log(name, age);
	}
}
const pTest = new ParaTest();
pTest.getInfo('lc', 18);

// 使用实例
const userInfo: any = undefined;
function catchErr(msg: string) {
	return function (target: any, key: string, descriptor: PropertyDescriptor) {
		// 目标函数的值
		const fn = descriptor.value;
		descriptor.value = () => {
			try {
				fn();
			} catch (error) {
				console.log(`err: ${msg}!`);
			}
		};
	};
}
class Person {
	@catchErr('userInfo.name 不存在')
	getName() {
		return userInfo.name;
	}

	@catchErr('userInfo.age 不存在')
	getAge() {
		return userInfo.age;
	}
}
const meInfo = new Person();
meInfo.getName();
meInfo.getAge();
