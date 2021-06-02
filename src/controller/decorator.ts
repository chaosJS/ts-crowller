import { Router, RequestHandler } from 'express';
import 'reflect-metadata';
export const router = Router();
enum Method {
	get = 'get',
	post = 'post',
}
export function controller(target: any) {
	for (const key in target.prototype) {
		// 获取自定义数据
		// console.log(Reflect.getMetadata('path', target.prototype, key));
		const path = Reflect.getMetadata('path', target.prototype, key);
		const method: Method = Reflect.getMetadata('method', target.prototype, key);
		const handler = target.prototype[key];
		// 在总控制器中获得middleware
		const middleware = Reflect.getMetadata('middleware', target.prototype, key);
		if (path && method && handler) {
			if (middleware) {
				// express 中 router的参数
				router[method](path, middleware, handler);
			} else {
				router[method](path, handler);
			}
		}
	}
}
// export function get(path: string) {
// 	return (target: any, key: string, descriptor: PropertyDescriptor) => {
// 		// metadataKey: any, metadataValue: any, target: Object, propertyKey: string
// 		// 定义元数据，自定义数据
// 		Reflect.defineMetadata('path', path, target, key);

// 		// 定义方法 在controller中获取到
// 		Reflect.defineMetadata('method', 'get', target, key);
// 	};
// }
// export function post(path: string) {
// 	return (target: any, key: string, descriptor: PropertyDescriptor) => {
// 		// metadataKey: any, metadataValue: any, target: Object, propertyKey: string
// 		// 定义元数据，自定义数据
// 		Reflect.defineMetadata('path', path, target, key);
// 		Reflect.defineMetadata('method', 'post', target, key);
// 	};
// }

// factory mode to export method
function genMethods(type: string) {
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

export function useMiddleware(middleware: RequestHandler) {
	// return a real deco func
	return (target: any, key: string) => {
		// matadata 的key是middleware 值是middleware 存放在target对应的key上，
		Reflect.defineMetadata('middleware', middleware, target, key);
		// { getData: [Function (anonymous)], showData: [Function (anonymous)] } showData
		// console.log(target, key, 'sss');
	};
}

export const get = genMethods('get');
export const post = genMethods('post');
// export const put = genMethods('put');
