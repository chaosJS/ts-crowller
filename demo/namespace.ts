namespace Home {
	class Header {
		constructor() {
			const ele = document.createElement('div');
			ele.innerText = 'this is header';
			document.appendChild(ele);
		}
	}
	class Content {
		constructor() {
			const ele = document.createElement('div');
			ele.innerText = 'this is content';
			document.appendChild(ele);
		}
	}

	export class Page {
		constructor() {
			new Header();
			new Content();
		}
	}

	export namespace SubHome {
		const test = '1';
	}
}

// 使用的时候
// new Home.Page();
$(() => {
	console.log('s');
	$('div').html('<p>123</p>');
});
