enum Methods {
	get = 'get',
	post = 'post',
	// put = 'put'
}
// factory mode to export method
function genMethods(type: Methods) {
	return function (path: string) {
		return (target: any, key: string, descriptor: PropertyDescriptor) => {
			// metadataKey: any, metadataValue: any, target: Object, propertyKey: string
			// 定义元数据，自定义数据
			Reflect.defineMetadata('path', path, target, key);

			// 定义方法 在controller中获取到
			Reflect.defineMetadata('method', type, target, key);
		};
	};
}
export const get = genMethods(Methods.get);
export const post = genMethods(Methods.post);
// export const put = genMethods(Methods.put);
