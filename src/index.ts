import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import router from './router';
import './controller/loginController';
import './controller/crowllerController';
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	cookieSession({
		name: 'session',
		keys: ['chaos li'],
		maxAge: 24 * 60 * 60 * 1000,
	})
);
app.use((req: Request, res: Response, next: NextFunction) => {
	req.myName = 'lc';
	next();
});
app.use(router);
app.listen(7001, () => {
	console.log('server is running');
});
