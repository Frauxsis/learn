let http = require('http');
let moduleRenderHTML = require('./modules/renderHTML');
let moduleRenderStatus = require('./modules/renderStatus');
//创建服务器
http
	.createServer((req, res) => {
		//req 接收浏览器传的参数，
		//res 返回渲染的内容
		if (req.url === '/favicon.ico') {
			//todo 读取本地图标
			return;
		}
		console.log(req.url);
		res.writeHead(moduleRenderStatus.renderStatus(req.url), {
			'Content-Type': 'text/html ;charset=utf-8',
		});

		res.write(moduleRenderHTML.renderHTML(req.url));
		res.end('[1,2,3]');
	})
	.listen(3000, () => {
		console.log('server start');
	});
