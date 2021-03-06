import superagent from 'superagent';
export interface Analyzer {
	url: string;
	filePath: string;
	analyze: (html: string) => void;
}
export default class Crowller {
	private async getRawHtml(url: string) {
		const res = await superagent.get(url).set({
			'User-Agent':
				'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
		});
		return res.text;
	}

	private async initSpider() {
		const html = await this.getRawHtml(this.analyzer.url);
		this.analyzer.analyze(html);
	}
	constructor(private analyzer: any) {
		this.initSpider();
	}
}
