// 类型作为对象的key值
type Name = 'name';
const aa: Name = 'name';

interface Person {
	name: string;
	age: number;
	gender: boolean;
}

class Teacher {
	constructor(private info: Person) {}
	getInfo<T extends keyof Person>(key: T): Person[T] {
		//  T extends keyof Person
		// T 的类型只能是Person的三个key
		return this.info[key];
	}
}

const test = new Teacher({
	name: 'lc',
	age: 18,
	gender: true,
});
const res = test.getInfo('gender');
