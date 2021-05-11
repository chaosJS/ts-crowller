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
