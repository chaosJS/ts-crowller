// crowller data show data controller
import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import BtcAnalyzer from '../utils/8btcAnalyzer';
import Crowller from '../utils/crowller';
import { controller, useMiddleware, get } from '../decorator';
import { getResData } from '../utils/util';
import fs from 'fs';
import path from 'path';
interface RequestWithBody extends Request {
	// solve express with any type
	body: {
		// password: string | undefined;
		// This is a key/value structure. The key is a string and the value is a string or undefined
		[key: string]: string | undefined;
	};
}

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
	console.log('login middleware');
	const isLogin = req.session ? req.session.login : undefined;
	if (isLogin) {
		next();
	} else {
		// res.send('请先登陆');
		res.json(getResData(null, '请先登陆'));
	}
};
const testMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	console.log('test middleware');
	next();
};
@controller('/api')
class CrowllerController {
	@get('/getData')
	@useMiddleware(checkLogin)
	@useMiddleware(testMiddleware)
	getData(req: RequestWithBody, res: Response): void {
		//express.bodyParser() is no longer bundled as part of express.
		// You need to install it separately before loading:
		const btcAnalyzer = BtcAnalyzer.getInstance('https://m.8btc.com/');
		new Crowller(btcAnalyzer);
		res.json(getResData(true));
	}

	@get('/showData')
	@useMiddleware(checkLogin)
	showData(req: RequestWithBody, res: Response): void {
		fs.stat(
			path.resolve(__dirname, '../../data/newsInfo.json'),
			(err, stat) => {
				if (err === null) {
					const dataPath = path.resolve(__dirname, '../../data/newsInfo.json');
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
			}
		);
	}
}
