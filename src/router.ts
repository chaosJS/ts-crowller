import e, { Router, Request, Response } from 'express';
import BtcAnalyzer from './8btcAnalyzer';
import Crowller from './crowller';
import fs from 'fs';
import path from 'path';
const router = Router();
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
		res.send('已经登陆');
	} else {
		if (password == '123' && req.session) {
			// 登陆状态
			req.session.login = true;
			res.send('登陆成功');
		} else {
			res.send('password err');
		}
	}
});
router.get('/logout', (req: Request, res: Response) => {
	if (req.session) {
		req.session.login = undefined;
	}
	res.redirect('/');
});
interface RequestWithBody extends Request {
	// solve express with any type
	body: {
		// password: string | undefined;
		// This is a key/value structure. The key is a string and the value is a string or undefined
		[key: string]: string | undefined;
	};
}
router.get('/getData', (req: RequestWithBody, res: Response) => {
	//express.bodyParser() is no longer bundled as part of express.
	// You need to install it separately before loading:
	// valid password
	const isLogin = req.session ? req.session.login : undefined;

	if (isLogin) {
		const btcAnalyzer = BtcAnalyzer.getInstance(
			'https://m.8btc.com/',
			// ../data 固定保存数据目录
			'../data/newsInfo.json'
		);
		new Crowller(btcAnalyzer);
		res.send(
			`
			<p>
			get data success
			</p>
			<a href="/showData">show data</a>
			`
		);
	} else {
		res.send(`${req.myName} 登陆之后才能爬取`);
	}
});

router.get('/showData', (req: RequestWithBody, res: Response) => {
	const isLogin = req.session ? req.session.login : undefined;
	if (isLogin) {
		fs.stat(path.resolve(__dirname, '../data/newsInfo.json'), (err, stat) => {
			if (err === null) {
				const dataPath = path.resolve(__dirname, '../data/newsInfo.json');
				const result = fs.readFileSync(dataPath, 'utf-8');
				res.send(JSON.parse(result));
			} else if (err.code === 'ENOENT') {
				// file does not exist
				res.send('尚未爬取到内容');
			} else {
				res.send(`unexpect err: ${err.code}`);
			}
		});
	} else {
		res.send(`
			<p>尚未登陆，去<a href="/">登陆</a></p>
		`);
	}
});
export default router;
