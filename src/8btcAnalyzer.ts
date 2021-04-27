import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { Analyzer } from './crowller';
interface NewsList {
	title: string;
	viewNum: number;
}
interface Content {
	[propName: number]: NewsList[];
}

export default class BtcAnalyzer implements Analyzer {
	public url: string;
	public filePath: string;
	constructor(url: string, filePath: string) {
		this.url = url;
		this.filePath = path.resolve(__dirname, filePath);
	}
	public analyze(html: string) {
		const res = this.getListInfo(html);
		this.genJsonFile(res);
	}

	private getListInfo(html: string): Content {
		const newsList: NewsList[] = [];
		const $ = cheerio.load(html);
		const newslist = $('.article_list >li');
		newslist.map((index, elem) => {
			const title = $(elem).find('.title').text();
			const viewNum = parseInt($(elem).find('.info .view').text());
			newsList.push({ title, viewNum });
		});
		return {
			[new Date().getTime()]: newsList,
		};
	}
	private genJsonFile(res: Content) {
		if (!fs.existsSync(this.filePath)) {
			fs.writeFile(
				this.filePath,
				JSON.stringify({ ...res }),
				'utf-8',
				(err) => {
					if (err) {
						console.log('create file err:', err);
					} else {
						console.log('create file success!');
					}
				}
			);
		} else {
			fs.readFile(this.filePath, 'utf-8', (err, data) => {
				fs.writeFile(
					this.filePath,
					JSON.stringify({ ...JSON.parse(data), ...res }),
					'utf-8',
					(err) => {
						if (err) {
							console.log('push data err:', err);
						} else {
							console.log('push data success!');
						}
					}
				);
			});
		}
	}
}
