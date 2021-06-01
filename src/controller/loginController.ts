import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { controller, get } from './decorator';
import { getResData } from '../utils/util';
@controller
class LoginController {
	@get('/logout')
	logout(req: Request, res: Response) {
		if (req.session) {
			req.session.login = undefined;
		}
		// res.redirect('/');
		// data 字段返回一个true
		res.json(getResData(true));
	}
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
