import superagent from 'superagent';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
interface NewsList {
	title: string;
	viewNum: number;
}
interface Content {
	[propName: number]: NewsList[];
}
class Crowller {
	private url = 'https://m.8btc.com/';
	private filePath = path.resolve(__dirname, '../data/newsInfo.json');
	async getRawHtml() {
		const res = await superagent.get(this.url).set({
			'User-Agent':
				'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
		});
		return res.text;
	}
	getListInfo(html: string): Content {
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
	genJsonFile(res: Content) {
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
	async initSpider() {
		const html = await this.getRawHtml();
		const res = this.getListInfo(html);
		this.genJsonFile(res);
	}

	constructor() {
		this.initSpider();
	}
}

const crowller = new Crowller();
