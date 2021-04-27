import superagent from 'superagent';
import BtcAnalyzer from './8btcAnalyzer';
export interface Analyzer {
	url: string;
	filePath: string;
	analyze: (html: string) => void;
}
class Crowller {
	async getRawHtml(url: string) {
		const res = await superagent.get(url).set({
			'User-Agent':
				'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
		});
		return res.text;
	}

	async initSpider() {
		const html = await this.getRawHtml(this.analyzer.url);
		this.analyzer.analyze(html);
	}
	constructor(private analyzer: any) {
		this.initSpider();
	}
}

const btcAnalyzer = new BtcAnalyzer(
	'https://m.8btc.com/',
	'../data/newsInfo.json'
);
const crowller = new Crowller(btcAnalyzer);
