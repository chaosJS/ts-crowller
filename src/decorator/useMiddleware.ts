import { RequestHandler } from 'express';
import 'reflect-metadata';

export function useMiddleware(middleware: RequestHandler) {
	// return a real deco func
	return (target: any, key: string) => {
		// matadata 的key是middleware 值是middleware 存放在target对应的key上，
		// Reflect.defineMetadata('middleware', middleware, target, key);
		// { getData: [Function (anonymous)], showData: [Function (anonymous)] } showData
		// console.log(target, key, 'sss');

		// 可以使用多个middleware
		const middlewares = Reflect.getMetadata('middlewares', target, key) || [];
		middlewares.push(middleware);
		Reflect.defineMetadata('middlewares', middlewares, target, key);
	};
}
