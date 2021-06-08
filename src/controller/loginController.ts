import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { controller, get, post } from '../decorator';
import { getResData } from '../utils/util';

// @controller('/abc')
@controller('/api')
class LoginController {
	@post('/login')
	login(req: Request, res: Response): void {
		const { password } = req.body;
		const isLogin = req.session ? req.session.login : false;
		if (isLogin) {
			// res.send('已经登陆');
			res.json(getResData(false, '已经登陆'));
		} else {
			if (password == '123' && req.session) {
				// 登陆状态
				req.session.login = true;
				// res.send('登陆成功');
				res.json(getResData(true));
			} else {
				// res.send('password err');
				res.json(getResData(false, '密码错误，登陆失败'));
			}
		}
	}
	@get('/logout')
	logout(req: Request, res: Response): void {
		if (req.session) {
			req.session.login = false;
		}
		// data 字段返回一个true
		res.json(getResData(true));
	}
	@get('/isLogin')
	isLogin(req: Request, res: Response): void {
		const isLogin: boolean = !!(req.session ? req.session.login : false);
		res.json(getResData(isLogin));
	}
}
