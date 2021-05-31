import { Router, Request, Response, NextFunction } from 'express';
import BtcAnalyzer from './utils/8btcAnalyzer';
import Crowller from './utils/crowller';
import { getResData } from './utils/util';

import fs from 'fs';
import path from 'path';
const router = Router();
// add if login middleware
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
	const isLogin = req.session ? req.session.login : undefined;
	if (isLogin) {
		next();
	} else {
		// res.send('请先登陆');
		res.json(getResData(null, '请先登陆'));
	}
};
router.get('/', (req: Request, res: Response) => {
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
});
router.post('/login', (req: Request, res: Response) => {
	const { password } = req.body;
	const isLogin = req.session ? req.session.login : undefined;
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
});
router.get('/logout', (req: Request, res: Response) => {
	if (req.session) {
		req.session.login = undefined;
	}
	// res.redirect('/');
	// data 字段返回一个true
	res.json(getResData(true));
});
interface RequestWithBody extends Request {
	// solve express with any type
	body: {
		// password: string | undefined;
		// This is a key/value structure. The key is a string and the value is a string or undefined
		[key: string]: string | undefined;
	};
}

// 进入 getData 路由的时候，先走checkLogin 中间件，之后进入下个函数
router.get(
	'/getData',
	// use checkLogin middle
	checkLogin,
	(req: RequestWithBody, res: Response) => {
		//express.bodyParser() is no longer bundled as part of express.
		// You need to install it separately before loading:
		const btcAnalyzer = BtcAnalyzer.getInstance('https://m.8btc.com/');
		new Crowller(btcAnalyzer);
		res.send(
			`
			<p>
			get data success
			</p>
			<a href="/showData">show data</a>
			`
		);
	}
);

router.get('/showData', checkLogin, (req: RequestWithBody, res: Response) => {
	fs.stat(path.resolve(__dirname, '../data/newsInfo.json'), (err, stat) => {
		if (err === null) {
			const dataPath = path.resolve(__dirname, '../data/newsInfo.json');
			const result = fs.readFileSync(dataPath, 'utf-8');
			// res.send(JSON.parse(result));
			res.json(getResData(JSON.parse(result)));
		} else if (err.code === 'ENOENT') {
			// file does not exist
			// res.send('尚未爬取到内容');
			res.json(getResData(false, '尚未爬取到内容'));
		} else {
			// res.send(`unexpect err: ${err.code}`);
			res.json(getResData(false, `unexpect err: ${err.code}`));
		}
	});
});
export default router;
