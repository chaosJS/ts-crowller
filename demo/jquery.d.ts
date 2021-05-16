// 定义全局变量
// declare var $: (fn: () => void) => void;

// 定义全局函数
declare function $(readyFn: () => void): void;
// 全局中如何对 对象进行类型定义
declare namespace $ {
	declare namespace fn {
		class init {}
	}
}
// 在使用的时候可以用 $.fn.init()
/* 
  使用
  $(() => {
    $('div').html();
  });
**/
interface JqInstance {
	html: (html: string) => {};
}
declare function $(selector: string): JqInstance;

interface JQuery {
	(readyFn: () => void): void;
	(selector: string): JqInstance;
}

declare var $: JQuery;

// es6 模块化导出
declare module 'jquery' {
	interface JqInstance {
		html: (html: string) => {};
	}
	function $(readyFn: () => void): void;
	function $(selector: string): JqInstance;
	namespace $ {
		namespace fn {
			class init {}
		}
	}

	// 最后需要导出
	export = $;
}
