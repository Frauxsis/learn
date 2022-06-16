// 完整引入
// import 'core-js';

//按需加载
import 'core-js/es/promise';

import count from './js/count';
import sum from './js/sum';

//想要webpack打包资源，必须引入该资源
import './css/index.css';
import './less/index.less';

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));

document.getElementById('btn').onclick = function () {
	//eslint不识别动态导入语法，需要额外添加配置
	// /* webpackChunkName:'math' */ 魔法命名
	import(/* webpackChunkName:'math' */ './js/math').then(({ mul }) => {
		console.log(mul(3, 3));
	});
};



if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) => {
				console.log('SW registered: ', registration);
			})
			.catch((registrationError) => {
				console.log('SW registration failed: ', registrationError);
			});
	});
}