// 联合类型 类型保护
interface Bird {
	fly: boolean;
	sing: () => {};
}
interface Dog {
	fly: boolean;
	bark: () => {};
}

function trainAnimal(
	// 参数的联合类型
	animal: Bird | Dog
) {
	// 用as 类型断言的方式实现类型保护
	if (animal.fly) {
		(animal as Bird).sing();
	} else {
		(animal as Dog).bark();
	}

	// 用 in 语法实现类型保护
	if ('sing' in animal) {
		animal.sing();
	} else {
		animal.bark();
	}
}

// 也可以使用 typeof 和 instanceof 判断基础类型和对象类型 实现类型保护

// 枚举类型
enum Status {
	OFFLINE,
	ONLINE,
	DELETED,
	ERROR,
}
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
enum Status1 {
	OFFLINE = 1,
	ONLINE,
	DELETED,
	ERROR,
	// 下标从1开始
}

// 函数泛型
function join(first: string | number, second: string | number) {
	return `${first}${second}`;
}
// 希望传入的参数类型相同
function genericJoin<XXX>(first: XXX, second: XXX) {
	return `${first}${second}`;
}
genericJoin<string>('1', '2');

// 泛型数组
function map<ABC>(params: ABC[]) {
	return params;
}
map<string>(['2', '3']);
// 常用的泛型用T作为简写
function fn<T>(params: Array<T>) {
	return params;
}

// 两个泛型
function doubleT<T, U>(first: T, second: U) {
	return `${first}${second}`;
}
//
doubleT(12, '12'); // 不写尖括号ts会自动推断类型
doubleT<string, number>('1', 23);

// 类中的泛型

class DataMana<T> {
	// 此处定义一个类型未知的泛型T
	constructor(private data: T[]) {}
	getItem(index: number): T {
		return this.data[index];
	}
}
const data = new DataMana(['s', 1, true]);
data.getItem(0);

// 泛型的extends
interface Item {
	name: string;
}
class DataMana1<T extends Item> {
	// T extends Item 说明 这个泛型必须有Item里面所有属性
	constructor(private data: T[]) {}
	getItem(index: number): string {
		return this.data[index].name;
	}
}

const data1 = new DataMana1<Item>([{ name: 'lc' }]);
const data2 = new DataMana1<{ name: string }>([{ name: 'lc' }]);
data1.getItem(0);

// 泛型作为一个具体的类型注解
function hello<T>(params: T): T {
	return params;
}
const func: <T>(params: T) => T = hello;
