import { RequestHandler } from 'express';
import router from '../router';
enum Methods {
	get = 'get',
	post = 'post',
	// put = 'put'
}
export function controller(root: string) {
	return (target: new (...args: any[]) => any) => {
		for (const key in target.prototype) {
			// 获取自定义数据
			// console.log(Reflect.getMetadata('path', target.prototype, key));
			const path: string = Reflect.getMetadata('path', target.prototype, key);
			const method: Methods = Reflect.getMetadata(
				'method',
				target.prototype,
				key
			);
			const handler: RequestHandler = target.prototype[key];
			// 在总控制器中获得middleware
			const middlewares: RequestHandler[] = Reflect.getMetadata(
				'middlewares',
				target.prototype,
				key
			);
			if (path && method && handler) {
				const fullPath = root === '/' ? path : `${root}${path}`;
				if (middlewares && middlewares.length) {
					// express 中 router的参数
					router[method](fullPath, ...middlewares, handler);
				} else {
					router[method](fullPath, handler);
				}
			}
		}
	};
}
