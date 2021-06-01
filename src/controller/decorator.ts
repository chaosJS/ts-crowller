import { Router } from 'express';
import 'reflect-metadata';
export const router = Router();
export function controller(target: any) {
	for (const key in target.prototype) {
		// 获取自定义数据
		// console.log(Reflect.getMetadata('path', target.prototype, key));
		const path = Reflect.getMetadata('path', target.prototype, key);
		const handler = target.prototype[key];
		if (path) {
			router.get(path, handler);
		}
	}
}
export function get(path: string) {
	return (target: any, key: string, descriptor: PropertyDescriptor) => {
		// metadataKey: any, metadataValue: any, target: Object, propertyKey: string
		// 定义元数据，自定义数据
		Reflect.defineMetadata('path', path, target, key);
	};
}
