import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
function get(path: string) {
	return (target: any, key: string, descriptor: PropertyDescriptor) => {
		// metadataKey: any, metadataValue: any, target: Object, propertyKey: string
		// 定义元数据，自定义数据
		Reflect.defineMetadata('path', path, target, key);
	};
}
class LoginController {
	@get('/')
	home(req: Request, res: Response) {
		// 已经登陆访问首页
		const isLogin = req.session ? req.session.login : undefined;
		if (isLogin) {
			res.send(
				`
			<a href="/getData">爬取数据</a>
			<a href="/logout">退出</a>
			`
			);
		} else {
			res.send(
				`
			<form method="post" action="/login">
				<input type="password" name="password"></input>
				<button type="submit">登陆</button>
			</form>
			`
			);
		}
	}
}
